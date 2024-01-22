import { Tag } from './tags.model';

export enum Difficulty { EASY = 'easy', INTERMEDIATE = 'intermediate', HARD = 'hard' };
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface RecipePreview {
  name: string;
  difficulty: Difficulty;
  rating: Rating;
  duration: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  link: string;
  tags?: Tag[];
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
}

export interface RecipeStep {
  number: number;
  intructions: string;
  notes: string;
}

export interface Recipe extends RecipePreview {
  story: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}
