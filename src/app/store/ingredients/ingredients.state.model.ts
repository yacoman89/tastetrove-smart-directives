import { ApiLoadError } from '../../models/errors.model';
import { Ingredient } from '../../models/ingredient.model';

export interface IngredientsEntityModel {
  loading: boolean;
  error: ApiLoadError | null;
  ingredients: Ingredient[];
}

export interface IngredientsStateModel {
  [key: string]: IngredientsEntityModel;
}

export const defaultState: IngredientsStateModel = {};
