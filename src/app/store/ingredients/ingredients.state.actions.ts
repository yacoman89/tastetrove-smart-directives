const StatePrefix = '[Ingredients]';

export class FetchIngredients {
  static readonly type = `${StatePrefix} Fetch Ingredients`;
  constructor(public link: string, public options?: { force: boolean }) {}
}
