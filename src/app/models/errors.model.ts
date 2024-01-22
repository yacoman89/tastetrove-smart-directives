export class RecipeLoadError extends Error {
  readonly type = 'RecipeLoadError';
  constructor(public override message: string, public originalError?: Error) {
    super(message);
  }
}
