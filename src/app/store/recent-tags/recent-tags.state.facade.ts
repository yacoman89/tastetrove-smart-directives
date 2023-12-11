import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RecentTagsState } from './recent-tags.state';
import { RecentTagsError } from '../../services/recent-tags/recent-tags.service';
import { AddRecent, ClearAddError, ClearLoadError, FetchRecents } from './recent-tags.state.actions';

@Injectable()
export class RecentTagsStateFacade {
  constructor(private store: Store) {}

  tags$(fetchLink: string): Observable<string[]> {
    return this.store.select(RecentTagsState.tags(fetchLink));
  }

  loading$(fetchLink: string): Observable<boolean> {
    return this.store.select(RecentTagsState.loading(fetchLink));
  }

  loadError$(fetchLink: string): Observable<RecentTagsError | null> {
    return this.store.select(RecentTagsState.loadError(fetchLink));
  }

  adding$(fetchLink: string): Observable<boolean> {
    return this.store.select(RecentTagsState.adding(fetchLink));
  }

  addError$(fetchLink: string): Observable<RecentTagsError | null> {
    return this.store.select(RecentTagsState.addError(fetchLink));
  }

  fetchRecents(link: string, options: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchRecents(link, options));
  }

  clearLoadError(fetchLink: string): Observable<unknown> {
    return this.store.dispatch(new ClearLoadError(fetchLink));
  }
  
  addRecent(tagName: string, fetchLink: string): Observable<unknown> {
    return this.store.dispatch(new AddRecent(fetchLink, tagName));
  }
  
  clearAddError(fetchLink: string): Observable<unknown> {
    return this.store.dispatch(new ClearAddError(fetchLink));
  }
}