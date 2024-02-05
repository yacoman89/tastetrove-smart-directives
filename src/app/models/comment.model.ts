import { HateoasObject, LinkRelations, SelfLinkRelation } from './hateoas.model';

export const CommentsLinkTemplate = '/api/recipeComments?recipeId={recipeId}';
export const CommentsLinkRegex = /\{recipeId\}/;
export interface DbComment {
  id: number;
  recipeId: number;
  userId: number;
  date: string;
  comment: string;
}

type CommentLinkRelations = SelfLinkRelation & LinkRelations<'recipe' | 'user'>;
type BaseComment = DbComment & HateoasObject<CommentLinkRelations>;

export interface Comment extends BaseComment {
  user?: string;
};
