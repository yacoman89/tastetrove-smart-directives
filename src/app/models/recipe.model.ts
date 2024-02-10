import { RatingComponent } from '../components/common/rating/rating.component';
import { HateoasObject, LinkRelations, SelfLinkRelation } from './hateoas.model';
import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';
import { Tag } from './tag.model';

export const RecipeLinkTemplate = '/api/recipes?id={id}';
export const RecipeLinkRegex = /\{id\}/;
export const RecipeTagsLinkTemplate = '/api/recipeTags?id={id}';
export const RecipeTagsLinkRegex = /\{id\}/;
export const RecipeTagsRecipeLinkTemplate = '/api/recipeTags?recipeId={recipeId}';
export const RecipeTagsRecipeLinkRegex = /\{recipeId\}/;
export enum Difficulty { EASY = 'easy', INTERMEDIATE = 'intermediate', HARD = 'hard' };
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface DbRecipe {
  id: number;
  name: string;
  difficulty: Difficulty;
  duration: string;
  rating: Rating;
  imageUrl: string;
}

type RecipeLinkRelations = SelfLinkRelation & LinkRelations<'tags' | 'ingredients' | 'instructions' | 'comments'>;
type BaseRecipe = DbRecipe & HateoasObject<RecipeLinkRelations>;

export interface DbRecipeTag {
  id: number;
  recipeId: number;
  tagId: number;
}

type RecipeTagLinkRelations = SelfLinkRelation & LinkRelations<'tag' | 'recipe'>;
export type BaseRecipeTag = DbRecipeTag & HateoasObject<RecipeTagLinkRelations>;

export type RecipeTag = BaseRecipeTag & Tag;

export interface RecipePreview extends BaseRecipe {
  tags?: RecipeTag[];
}

export interface Recipe extends RecipePreview {
  ingredients: Ingredient[];
  instructions: Instruction[];
  comments: Comment[];
}

export const PlaceholderRecipe: RecipePreview = {
  id: -1,
  name: 'placeholder only',
  difficulty: Difficulty.EASY,
  duration: '',
  rating: 1,
  imageUrl: '',
  _links: {
    self: { href: '#' },
    ingredients: { href: '#' },
    instructions: { href: '#' },
    tags: { href: '#' },
    comments: { href: '#' }
  }
};
