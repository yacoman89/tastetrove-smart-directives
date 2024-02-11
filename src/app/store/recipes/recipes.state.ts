import { Action, State, StateContext, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { RecipeEntityModel, RecipeListEntityModel, RecipesStateModel, defaultState } from './recipes.state.model';
import { RecipeService } from '../../services/recipe/recipe.service';
import { FetchRecipeList, FetchRecipePreview, PreloadRecipePreviewFromList } from './recipes.state.actions';
import { ApiLoadError } from '../../models/errors.model';
import { Recipe, RecipePreview } from '../../models/recipe.model';
import { TagService } from '../../services/tag/tag.service';

class StateManager {
  constructor(private ctx: StateContext<RecipesStateModel>, private link: string) {}

  private statePatch<T>(patch: Partial<T>, key: 'recipesList' | 'recipes'): void {
    const subState = this.ctx.getState()[key];
    const entityState = subState[this.link];
    this.ctx.patchState({ [key]: { ...subState, [this.link]: { ...entityState, ...patch } } });
  }

  set recipeListPatch(patch: Partial<RecipeListEntityModel>) {
    this.statePatch(patch, 'recipesList');
  }

  set recipePatch(patch: Partial<RecipeEntityModel>) {
    this.statePatch(patch, 'recipes');
  }

  get recipesListEntity(): RecipeListEntityModel {
    return this.ctx.getState().recipesList[this.link];
  }

  get recipeEntity(): RecipeEntityModel {
    return this.ctx.getState().recipes[this.link];
  }
}

@State<RecipesStateModel>({
  name: 'recipesState',
  defaults: defaultState
})
@Injectable()
export class RecipesState {
  private static recipeListEntity(key: string): (state: RecipesStateModel) => RecipeListEntityModel {
    return createSelector([RecipesState], (state) => state.recipesList[key] || { loading: true, error: null, recipePreviewLinks: [] });
  }

  private static recipeListLinks(key: string): (entity: RecipeListEntityModel) => string[] {
    return createSelector([RecipesState.recipeListEntity(key)], (entity) => entity.recipePreviewLinks);
  }

  static recipeList(key: string): (state: RecipesStateModel) => (RecipePreview | Recipe)[] {
    return createSelector([RecipesState], (state) => {
      const links = RecipesState.recipeListLinks(key)(RecipesState.recipeListEntity(key)(state)) || [];
      return links.reduce((recipes, link) => {
        const recipe = RecipesState.recipe(link)(RecipesState.recipeEntity(link)(state));
        if (recipe) recipes.push(recipe);
        return recipes;
      }, new Array<RecipePreview | Recipe>());
    });
  }

  static recipesByTag(tagLink: string): (state: RecipesStateModel) => (RecipePreview | Recipe)[] {
    return createSelector([RecipesState], (state) => {
      return Object.keys(state.recipes).reduce((recipes, link) => {
        const recipe = state.recipes[link];
        const hasTag = !!(recipe.recipe.tags?.find((tag) => tag._links.tag.href === tagLink));
        if (hasTag) recipes.push(recipe.recipe);
        return recipes;
      }, new Array<RecipePreview | Recipe>());
    });
  }

  static recipeListLoading(key: string): (entity: RecipeListEntityModel) => boolean {
    return createSelector([RecipesState.recipeListEntity(key)], (entity) => entity.loading);
  }

  static recipeListError(key: string): (entity: RecipeListEntityModel) => ApiLoadError | null {
    return createSelector([RecipesState.recipeListEntity(key)], (entity) => entity.error);
  }

  private static recipeEntity(key: string): (state: RecipesStateModel) => RecipeEntityModel {
    return createSelector([RecipesState], (state) => state.recipes[key] || { loading: true, error: null, recipe: null });
  }

  static recipe(key: string): (entity: RecipeEntityModel) => RecipePreview | Recipe {
    return createSelector([RecipesState.recipeEntity(key)], (entity) => entity.recipe);
  }

  static recipeLoading(key: string): (entity: RecipeEntityModel) => boolean {
    return createSelector([RecipesState.recipeEntity(key)], (entity) => entity.loading);
  }

  static recipeError(key: string): (entity: RecipeEntityModel) => ApiLoadError | null {
    return createSelector([RecipesState.recipeEntity(key)], (entity) => entity.error);
  }

  constructor(private service: RecipeService, private tagService: TagService) {}

  @Action(FetchRecipeList)
  fetchRecipeList(ctx: StateContext<RecipesStateModel>, { link, options }: FetchRecipeList): Observable<unknown> {
    const manager = new StateManager(ctx, link);
    if (manager.recipesListEntity && !options?.force) {
      return of(manager.recipesListEntity);
    }

    manager.recipeListPatch = { loading: true, error: null };
    return this.service.fetchRecipes(link).pipe(
      tap((recipePreviews) => (manager.recipeListPatch = { recipePreviewLinks: recipePreviews.map((recipe) => recipe._links.self.href) })),
      switchMap((recipePreviews) => ctx.dispatch(recipePreviews.map((preview) => new PreloadRecipePreviewFromList(preview)))),
      tap(() => (manager.recipeListPatch = { loading: false })),
      catchError((error) => {
        manager.recipeListPatch = { loading: false, error };
        return throwError(() => error);
      })
    );
  }

  @Action(FetchRecipePreview)
  fetchRecipePreview(ctx: StateContext<RecipesStateModel>, { link, options }: FetchRecipePreview): Observable<unknown> {
    const manager = new StateManager(ctx, link);
    if (manager.recipeEntity && !options?.force) {
      return of(manager.recipeEntity);
    }

    manager.recipePatch = { loading: true, error: null };
    return this.service.fetchRecipe(link).pipe(
      tap((recipePreview) => (manager.recipePatch = { loading: false, recipe: recipePreview })),
      catchError((error) => {
        manager.recipePatch = { loading: false, error };
        return throwError(() => error);
      })
    );
  }

  @Action(PreloadRecipePreviewFromList)
  preloadRecipePreviewFromList(ctx: StateContext<RecipesStateModel>, { recipePreview }: PreloadRecipePreviewFromList): Observable<unknown> {
    const manager = new StateManager(ctx, recipePreview._links.self.href);

    manager.recipePatch = { loading: true, error: null, recipe: recipePreview };
    if ((recipePreview.tags || []).length > 0) {
      return forkJoin((recipePreview.tags || []).map((recipeTag) =>
        this.tagService.fetchTag(recipeTag._links.tag.href).pipe(map((tag) => ({ ...recipeTag, ...tag })))
      )).pipe(tap((tags) => manager.recipePatch = { loading: false, recipe: { ...recipePreview, tags } }));
    }
    manager.recipePatch = { loading: false };
    return of(manager.recipeEntity);
  }
}
