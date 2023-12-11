const StatePrefix = '[Recent Tags]';

export class FetchRecents {
  static readonly type = `${StatePrefix} Fetch Recents`;
  constructor(public link: string, public options?: { force: boolean }) {}
}

export class ClearLoadError {
  static readonly type = `${StatePrefix} Clear Load Error`;
  constructor(public fetchLink: string) {}
}

export class AddRecent {
  static readonly type = `${StatePrefix} Add Recent`;
  constructor(public fetchLink: string, public tagName: string) {}
}

export class ClearAddError {
  static readonly type = `${StatePrefix} Clear Add Error`;
  constructor(public fetchLink: string) {}
}
