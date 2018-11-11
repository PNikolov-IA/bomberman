import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';
import { GameObject } from './gameobject';

export class Bomb extends GameObject implements IGameObject {
  // Time before the bomb goes off in milliseconds
  private static readonly _duration: number = 2500;
  private readonly _planted: Date;
  private _timeactive: number;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    id: number
  ) {
    super(x, y, height, width, id);
    /* Encapsulate public properties and implement getters
    Set "planted" to the current Date
    Set "timeactive" to 0
    Set "objecttype" to GameObjectType.Bomb
    */
    this._objecttype = GameObjectType.Bomb;
    this._planted = new Date();
    this._timeactive = 0;
  }

  public get planted(): Date {
    return this._planted;
  }
  public get timeleft(): number {
    return Bomb._duration - (new Date().valueOf() - this._planted.valueOf());
  }
  public get timeactive(): number {
    return new Date().valueOf() - this._planted.valueOf();
  }
  public get duration(): number {
    return Bomb._duration;
  }
}
