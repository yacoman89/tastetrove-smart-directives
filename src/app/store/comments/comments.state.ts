import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import {
  CommentsEntityModel,
  CommentsStateModel,
  defaultState,
} from './comments.state.model';
import {
  FetchComments,
  FetchUser,
  PostComment,
} from './comments.state.actions';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment/comment.service';
import { User } from '../../models/user.model';

class StateManager {
  constructor(
    private ctx: StateContext<CommentsStateModel>,
    private link: string
  ) {}

  set patch(patch: Partial<CommentsEntityModel>) {
    const subState = this.ctx.getState().comments;
    const entityState = subState[this.link];
    this.ctx.patchState({
      comments: {
        ...subState,
        [this.link]: { ...entityState, ...patch }
      }
    });
  }

  get entity(): CommentsEntityModel {
    return this.ctx.getState().comments[this.link];
  }

  addComment(comment: Comment): void {
    const subState = this.ctx.getState().comments;
    const entityState = subState[this.link];
    this.ctx.patchState({
      comments: {
        ...subState,
        [this.link]: {
          ...entityState,
          addingComment: false,
          comments: [comment, ...entityState.comments],
        }
      }
    });
  }
}

@State<CommentsStateModel>({
  name: 'commentsState',
  defaults: defaultState,
})
@Injectable()
export class CommentsState {
  @Selector()
  static user(state: CommentsStateModel): User {
    return state.user!;
  }

  private static entity(
    key: string
  ): (state: CommentsStateModel) => CommentsEntityModel {
    return createSelector(
      [CommentsState],
      (state) =>
        state.comments[key] || { loading: true, error: null, ingredients: null }
    );
  }

  static comments(key: string): (entity: CommentsEntityModel) => Comment[] {
    return createSelector(
      [CommentsState.entity(key)],
      (entity) => entity.comments
    );
  }

  static loading(key: string): (entity: CommentsEntityModel) => boolean {
    return createSelector(
      [CommentsState.entity(key)],
      (entity) => entity.loading
    );
  }

  static error(
    key: string
  ): (entity: CommentsEntityModel) => ApiLoadError | null {
    return createSelector(
      [CommentsState.entity(key)],
      (entity) => entity.error
    );
  }

  constructor(private service: CommentService) {}

  @Action(FetchUser)
  fetchUser(
    ctx: StateContext<CommentsStateModel>,
    { username }: FetchUser
  ): Observable<unknown> {
    return this.service
      .fetchUser(username)
      .pipe(tap((user) => ctx.patchState({ user })));
  }

  @Action(FetchComments)
  fetchComments(
    ctx: StateContext<CommentsStateModel>,
    { link, options }: FetchComments
  ): Observable<unknown> {
    const manager = new StateManager(ctx, link);
    if (manager.entity && !options?.force) {
      return of(manager.entity);
    }

    manager.patch = { loading: true, error: null };
    return this.service.fetchComments(link).pipe(
      tap((comments) => {
        comments.sort(
          (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
        );
        manager.patch = { loading: false, comments };
      }),
      catchError((error) => {
        manager.patch = { loading: false, error };
        return throwError(() => error);
      })
    );
  }

  @Action(PostComment)
  postComment(
    ctx: StateContext<CommentsStateModel>,
    { recipe, comment }: PostComment
  ): Observable<unknown> {
    const manager = new StateManager(ctx, recipe._links.comments.href);
    manager.patch = { addingComment: true, commentAddError: null };
    return this.service
      .postComment(CommentsState.user(ctx.getState())!, recipe, comment)
      .pipe(
        tap((comment) => manager.addComment(comment)),
        catchError((error) => {
          manager.patch = { addingComment: false, commentAddError: error };
          return throwError(() => error)
        })
      );
  }
}
