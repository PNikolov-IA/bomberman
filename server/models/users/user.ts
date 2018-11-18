import { IUser } from '../../common';

export class User implements IUser {
  private _id: number;
  private _gamesPlayed: number;
  private _loggedInOn: Date;

  private _ingame: boolean = false;

  public constructor(id: number) {
    this._id = id;
    this._loggedInOn = new Date();
  }

  public get id(): number {
    return this._id;
  }

  public get gamesPlayed(): number {
    return this._gamesPlayed;
  }

  public completeGame(): void {
    this._gamesPlayed += 1;
  }

  public get loggedInOn(): Date {
    return this._loggedInOn;
  }

  public get ingame(): boolean {
    return this._ingame;
  }

  public join(): void {
    this._ingame = true;
  }

  public leave(): void {
    this._ingame = false;
  }

  public get timeOnline(): number {
    return new Date().valueOf() - this._loggedInOn.valueOf();
  }
}
