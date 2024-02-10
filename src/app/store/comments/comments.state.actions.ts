const StatePrefix = '[Comments]';

export class FetchComments {
  static readonly type = `${StatePrefix} Fetch Comments`;
  constructor(public link: string, public options?: { force: boolean }) {}
}
