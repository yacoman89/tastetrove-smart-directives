export class ApiLoadError extends Error {
  readonly type = 'ApiLoadError';
  constructor(public override message: string, public originalError?: Error) {
    super(message);
  }
}
