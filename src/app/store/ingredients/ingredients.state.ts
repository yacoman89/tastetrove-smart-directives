import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { IngredientsEntityModel, IngredientsStateModel, defaultState } from './ingredients.state.model';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { FetchIngredients } from './ingredients.state.actions';

class StateManager {
  constructor(private ctx: StateContext<IngredientsStateModel>, private link: string) {}

  set patch(patch: Partial<IngredientsEntityModel>) {
    const subState = this.ctx.getState();
    const entityState = subState[this.link];
    this.ctx.patchState({ ...subState, [this.link]: { ...entityState, ...patch } });
  }

  get entity(): IngredientsEntityModel {
    return this.ctx.getState()[this.link];
  }
}

@State<IngredientsStateModel>({
  name: 'ingredientsState',
  defaults: defaultState
})
@Injectable()
export class IngredientsState {
  private static entity(key: string): (state: IngredientsStateModel) => IngredientsEntityModel {
    return createSelector([IngredientsState], (state) => state[key] || { loading: true, error: null, ingredients: null });
  }

  static ingredients(key: string): (entity: IngredientsEntityModel) => Ingredient[] {
    return createSelector([IngredientsState.entity(key)], (entity) => entity.ingredients);
  }

  static loading(key: string): (entity: IngredientsEntityModel) => boolean {
    return createSelector([IngredientsState.entity(key)], (entity) => entity.loading);
  }

  static error(key: string): (entity: IngredientsEntityModel) => ApiLoadError | null {
    return createSelector([IngredientsState.entity(key)], (entity) => entity.error);
  }

  constructor(private service: IngredientService) {}

  @Action(FetchIngredients)
  fetchIngredients(ctx: StateContext<IngredientsStateModel>, { link, options }: FetchIngredients): Observable<unknown> {
    const manager = new StateManager(ctx, link);
    if (manager.entity && !options?.force) {
      return of(manager.entity);
    }

    manager.patch = { loading: true, error: null };
    return this.service.fetchIngredients(link).pipe(
      tap((ingredients) => (manager.patch = { loading: false, ingredients })),
      catchError((error) => {
        manager.patch = { loading: false, error };
        return throwError(() => error);
      })
    );
  }
}
