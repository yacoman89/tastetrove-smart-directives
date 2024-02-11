import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApiLoadError } from '../../models/errors.model';
import { Ingredient } from '../../models/ingredient.model';
import { FetchIngredients } from './ingredients.state.actions';
import { IngredientsState } from './ingredients.state';

@Injectable()
export class IngredientsStateFacade {
  constructor(private store: Store) {}

  ingredients$(fetchLink: string): Observable<Ingredient[]> {
    return this.store.select(IngredientsState.ingredients(fetchLink));
  }

  loading$(fetchLink: string): Observable<boolean> {
    return this.store.select(IngredientsState.loading(fetchLink));
  }

  error$(fetchLink: string): Observable<ApiLoadError | null> {
    return this.store.select(IngredientsState.error(fetchLink));
  }

  fetchIngredients(link: string, options?: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchIngredients(link, options));
  }
}
