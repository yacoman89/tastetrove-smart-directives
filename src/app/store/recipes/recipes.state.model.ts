import { ApiLoadError } from '../../models/errors.model';
import { Recipe, RecipePreview } from '../../models/recipe.model';

export interface RecipeListEntityModel {
  loading: boolean;
  error: ApiLoadError | null;
  recipePreviewLinks: string[];
}

export interface RecipeEntityModel {
  loading: boolean;
  error: ApiLoadError | null;
  recipe: Recipe | RecipePreview;
}

export interface RecipesStateModel {
  recipesList: { [key: string]: RecipeListEntityModel };
  recipes: { [key: string]: RecipeEntityModel };
}

export const defaultState: RecipesStateModel = {
  recipesList: {},
  recipes: {}
};
