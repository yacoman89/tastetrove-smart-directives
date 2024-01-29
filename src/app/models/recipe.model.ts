import { Tag } from './tags.model';

export enum Difficulty { EASY = 'easy', INTERMEDIATE = 'intermediate', HARD = 'hard' };
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface RecipePreview {
  name: string;
  difficulty: Difficulty;
  rating: Rating;
  duration: string;
  imageUrl?: string;
  tags?: Tag[];
  recipeLink: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
}

export interface RecipeInstruction {
  number: number;
  instructions: string;
}

export interface Comment {
  user: string;
  date: string;
  comment: string;
}

export interface Recipe extends RecipePreview {
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  commentsLink: string;
}
