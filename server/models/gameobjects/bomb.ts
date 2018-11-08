import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';
import { GameObject } from './gameobject';

export class Bomb extends GameObject implements IGameObject {
  private static readonly _duration: number = 2500;
  private readonly _planted: Date;
  private _timeleft: number;
  private _timeactive: number;
  // Time before the bomb goes off in milliseconds

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    timeleft: number
  ) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Set "planted" to the current Date
    Set "timeactive" to 0
    Set "objecttype" to GameObjectType.Bomb
    */
    this._objecttype = GameObjectType.Bomb;
    this._planted = new Date();
    this._timeleft = timeleft;
    this._timeactive = 0;
  }

  public get planted(): Date {
    return this._planted;
  }
  public get timeleft(): number {
    return this._timeleft;
  }
  public get timeactive(): number {
    return this._timeactive;
  }
  public get duration(): number {
    return Bomb._duration;
  }
}
