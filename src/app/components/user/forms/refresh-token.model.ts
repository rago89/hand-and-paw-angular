export class RefreshToken {
  constructor(
    private _token: string,
    public tokenExpiringDate: number,
    public userId: string
  ) {}

  get token() {
    const currentDateInMilliseconds = new Date().getTime();
    if (
      !this.tokenExpiringDate ||
      currentDateInMilliseconds > this.tokenExpiringDate
    ) {
      return null;
    }
    return this._token;
  }
}
