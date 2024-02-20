import { ApiLoadError } from '../../models/errors.model';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';

export interface CommentsEntityModel {
  loading: boolean;
  error: ApiLoadError | null;
  addingComment?: boolean;
  commentAddError?: ApiLoadError | null;
  comments: Comment[];
}

export interface CommentsEntitiesModel {
  [key: string]: CommentsEntityModel;
}

export interface CommentsStateModel {
  user: User | null;
  comments: CommentsEntitiesModel;
}

export const defaultState: CommentsStateModel = {
  user: null,
  comments: {}
};
