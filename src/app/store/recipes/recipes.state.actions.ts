import { RecipePreview } from '../../models/recipe.model';

const StatePrefix = '[Recipes]';

export class FetchRecipeList {
  static readonly type = `${StatePrefix} Fetch Recipe List`;
  constructor(public link: string, public options?: { force: boolean }) {}
}

export class FetchRecipePreview {
  static readonly type = `${StatePrefix} Fetch Recipe Preview`;
  constructor(public link: string, public options?: { force: boolean }) {}
}

export class PreloadRecipePreviewFromList {
  static readonly type = `${StatePrefix} Preload Recipe Preview From List`;
  constructor(public recipePreview: RecipePreview) {}
}
