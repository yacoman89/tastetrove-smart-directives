import { HateoasObject, LinkRelations, SelfLinkRelation } from './hateoas.model';

export const IngredientLinkTemplate = '/api/recipeIngredients?recipeId={recipeId}';
export const IngredientLinkRegex = /\{recipeId\}/;
export interface DbIngredient {
  id: number;
  recipeId: number;
  name: string;
  quantity: string;
}

type IngredientLinkRelations = SelfLinkRelation & LinkRelations<'recipe'>;
type BaseIngredient = DbIngredient & HateoasObject<IngredientLinkRelations>;

export type Ingredient = BaseIngredient;
