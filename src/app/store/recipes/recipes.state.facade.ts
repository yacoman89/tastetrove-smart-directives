import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RecipesState } from './recipes.state';
import { Recipe, RecipePreview } from '../../models/recipe.model';
import { ApiLoadError } from '../../models/errors.model';
import { FetchRecipeList, FetchRecipePreview } from './recipes.state.actions';

@Injectable()
export class RecipesStateFacade {
  constructor(private store: Store) {}

  recipeList$(fetchLink: string): Observable<(RecipePreview | Recipe)[]> {
    return this.store.select(RecipesState.recipeList(fetchLink));
  }

  recipesByTag$(tagLink: string): Observable<(RecipePreview | Recipe)[]> {
    return this.store.select(RecipesState.recipesByTag(tagLink));
  }

  recipeListLoading$(fetchLink: string): Observable<boolean> {
    return this.store.select(RecipesState.recipeListLoading(fetchLink));
  }

  recipeListError$(fetchLink: string): Observable<ApiLoadError | null> {
    return this.store.select(RecipesState.recipeListError(fetchLink));
  }

  recipe$(fetchLink: string): Observable<RecipePreview | Recipe> {
    return this.store.select(RecipesState.recipe(fetchLink));
  }

  recipeLoading$(fetchLink: string): Observable<boolean> {
    return this.store.select(RecipesState.recipeLoading(fetchLink));
  }

  recipeError$(fetchLink: string): Observable<ApiLoadError | null> {
    return this.store.select(RecipesState.recipeError(fetchLink));
  }

  fetchRecipeList(link: string, options?: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchRecipeList(link, options));
  }

  fetchRecipePreview(link: string, options?: { force: boolean }): Observable<unknown> {
    return this.store.dispatch(new FetchRecipePreview(link, options));
  }
}
