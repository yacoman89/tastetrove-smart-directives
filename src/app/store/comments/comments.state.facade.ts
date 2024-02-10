import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { FetchComments } from './comments.state.actions';
import { CommentsState } from './comments.state';
import { Comment } from '../../models/comment.model';

@Injectable()
export class CommentsStateFacade {
  constructor(private store: Store) {}

  comments$(fetchLink: string): Observable<Comment[]> {
    return this.store.select(CommentsState.comments(fetchLink));
  }

  loading$(fetchLink: string): Observable<boolean> {
    return this.store.select(CommentsState.loading(fetchLink));
  }

  error$(fetchLink: string): Observable<ApiLoadError | null> {
    return this.store.select(CommentsState.error(fetchLink));
  }

  fetchComments(link: string, options?: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchComments(link, options));
  }
}
