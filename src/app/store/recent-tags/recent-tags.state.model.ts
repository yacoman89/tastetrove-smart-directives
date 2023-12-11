import { RecentTagsError, RecentTagsModel } from "../../services/recent-tags/recent-tags.service";

export interface RecentTagsStateModelEntity extends RecentTagsModel {
  loading: boolean;
  loadError: RecentTagsError | null;
  adding: boolean;
  addError: RecentTagsError | null;
}

export interface RecentTagsStateModel {
  [key: string]: RecentTagsStateModelEntity;
}

export const defaultState: RecentTagsStateModel = {};