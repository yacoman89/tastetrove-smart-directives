import { Recipe } from "../../models/recipe.model";

const StatePrefix = '[Comments]';

export class FetchUser {
  static readonly type = `${StatePrefix} Fetch User`;
  constructor(public username: string) {}
}

export class FetchComments {
  static readonly type = `${StatePrefix} Fetch Comments`;
  constructor(public link: string, public options?: { force: boolean }) {}
}

export class PostComment {
  static readonly type = `${StatePrefix} Post Comment`;
  constructor(public recipe: Recipe, public comment: string) {}
}
