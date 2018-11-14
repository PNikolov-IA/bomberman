import { GameObjectType, IntentType, MapType } from '../../common';
import { IMapInstance, IPlayer } from '../../contracts';
import { MapInstance } from '../../controllers';
import { GameObject } from './gameobject';

export class Player extends GameObject implements IPlayer {
  private static pid: number = 0;
  private _points: number;
  private _lastActive: Date;
  private _instance: MapInstance | null;
  private _isAlive: boolean;
  private _intents: IntentType[];
  private readonly _speed: number = 20;
  private _playerID: number;
  private _userID: number;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    id: number
  ) {
    super(x, y, height, width, id);

    this._points = 0;
    this._instance = null;
    this._lastActive = new Date();
    this._isAlive = true;
    this._objecttype = GameObjectType.Player;
    this._playerID = Player.pid += 1;
  }

  public get points(): number {
    return this._points;
  }

  public get instance(): MapInstance | null {
    return this._instance;
  }

  public set instance(instance: MapInstance | null) {
    this._instance = instance;
  }

  public get lastActive(): Date {
    return this._lastActive;
  }

  public get isAlive(): boolean {
    return this._isAlive;
  }

  public get playerID(): number {
    return this._playerID;
  }

  public set userID(id: number) {
    this._userID = id;
  }

  public get userID(): number {
    return this._userID;
  }

  public get speed(): number {
    return this._speed;
  }

  public update(intents: IntentType[]): void {
    /* Do not implement yet
    Logic pending on clarifying the update cycle throughout game objects
    */
  }
}
