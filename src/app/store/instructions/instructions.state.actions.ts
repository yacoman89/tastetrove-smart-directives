const StatePrefix = '[Instructions]';

export class FetchInstructions {
  static readonly type = `${StatePrefix} Fetch Instructions`;
  constructor(public link: string, public options?: { force: boolean }) {}
}
