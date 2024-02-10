import { ApiLoadError } from '../../models/errors.model';
import { Comment } from '../../models/comment.model';

export interface CommentsEntityModel {
  loading: boolean;
  error: ApiLoadError | null;
  comments: Comment[];
}

export interface CommentsStateModel {
  [key: string]: CommentsEntityModel;
}

export const defaultState: CommentsStateModel = {};
