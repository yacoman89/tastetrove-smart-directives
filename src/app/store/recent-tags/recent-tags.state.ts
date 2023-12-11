import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { RecentTagsStateModel, RecentTagsStateModelEntity, defaultState } from './recent-tags.state.model';
import { RecentTagsError, RecentTagsService } from '../../services/recent-tags/recent-tags.service';
import { AddRecent, ClearAddError, ClearLoadError, FetchRecents } from './recent-tags.state.actions';

@State<RecentTagsStateModel>({
  name: 'recentTagsState',
  defaults: defaultState
})
@Injectable()
export class RecentTagsState {
  private static entity(key: string): (state: RecentTagsStateModel) => RecentTagsStateModelEntity {
    return createSelector([RecentTagsState], (state) => state[key]);
  }

  static tags(key: string): (entity: RecentTagsStateModelEntity) => string[] {
    return createSelector([RecentTagsState.entity(key)], (entity) => entity.tags);
  }

  static loading(key: string): (entity: RecentTagsStateModelEntity) => boolean {
    return createSelector([RecentTagsState.entity(key)], (entity) => entity.loading);
  }

  static loadError(key: string): (entity: RecentTagsStateModelEntity) => RecentTagsError | null {
    return createSelector([RecentTagsState.entity(key)], (entity) => entity.loadError);
  }

  static adding(key: string): (entity: RecentTagsStateModelEntity) => boolean {
    return createSelector([RecentTagsState.entity(key)], (entity) => entity.adding);
  }

  static addError(key: string): (entity: RecentTagsStateModelEntity) => RecentTagsError | null {
    return createSelector([RecentTagsState.entity(key)], (entity) => entity.addError);
  }

  constructor(private service: RecentTagsService) {}

  @Action(FetchRecents)
  fetchRecents(ctx: StateContext<RecentTagsStateModel>, { link, options }: FetchRecents): Observable<unknown> {
    if (ctx.getState()[link] && !options?.force) {
      return of();
    }

    ctx.patchState({ [link]: { ...ctx.getState()[link], loading: true, loadError: null } })
    return this.service.fetchRecent(link).pipe(
      tap((recent) => ctx.patchState({ [link]: { ...ctx.getState()[link], ...recent, loading: false } })),
      catchError((loadError) => {
        ctx.patchState({ [link]: { ...ctx.getState()[link], loading: false, loadError } });
        return throwError(() => loadError);
      })
    );
  }

  @Action(ClearLoadError)
  clearLoadError(ctx: StateContext<RecentTagsStateModel>, { fetchLink }: ClearLoadError): Observable<unknown> {
    ctx.patchState({ [fetchLink]: { ...ctx.getState()[fetchLink], loadError: null } });
    return of();
  }

  @Action(AddRecent)
  addRecent(ctx: StateContext<RecentTagsStateModel>, { fetchLink, tagName }: AddRecent): Observable<unknown> {
    const preState = ctx.getState()[fetchLink];
    ctx.patchState({ [fetchLink]: { ...preState, adding: true, addError: null } })
    return this.service.addTag(tagName, preState.addLink).pipe(
      tap((recent) => {
        const state = ctx.getState()[fetchLink];
        ctx.patchState({
          [fetchLink]: {
            ...state,
            tags: [tagName, ...state.tags.slice(0, -1)],
            adding: false
          }
        })
      }),
      catchError((addError) => {
        ctx.patchState({ [fetchLink]: { ...ctx.getState()[fetchLink], adding: false, addError } });
        return throwError(() => addError);
      })
    );
  }

  @Action(ClearAddError)
  clearAddError(ctx: StateContext<RecentTagsStateModel>, { fetchLink }: ClearAddError): Observable<unknown> {
    ctx.patchState({ [fetchLink]: { ...ctx.getState()[fetchLink], addError: null } });
    return of();
  }
}