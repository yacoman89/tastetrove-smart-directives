import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { FetchComments, FetchUser, PostComment } from './comments.state.actions';
import { CommentsState } from './comments.state';
import { Comment } from '../../models/comment.model';
import { Recipe } from '../../models/recipe.model';
import { User } from '../../models/user.model';

@Injectable()
export class CommentsStateFacade {
  user$: Observable<User>;

  constructor(private store: Store) {
    this.user$ = this.store.select(CommentsState.user);
  }

  comments$(fetchLink: string): Observable<Comment[]> {
    return this.store.select(CommentsState.comments(fetchLink));
  }

  loading$(fetchLink: string): Observable<boolean> {
    return this.store.select(CommentsState.loading(fetchLink));
  }

  error$(fetchLink: string): Observable<ApiLoadError | null> {
    return this.store.select(CommentsState.error(fetchLink));
  }

  fetchUser(username: string): Observable<unknown> {
    return this.store.dispatch(new FetchUser(username));
  }

  fetchComments(link: string, options?: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchComments(link, options));
  }

  postComment(recipe: Recipe, comment: string): Observable<unknown> {
    return this.store.dispatch(new PostComment(recipe, comment));
  }
}
