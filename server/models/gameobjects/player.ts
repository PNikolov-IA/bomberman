import { GameObjectType, IntentType, MapType } from '../../common';
import { IMapInstance, IPlayer } from '../../contracts';
import { GameObject } from './gameobject';

export class Player extends GameObject implements IPlayer {
  private static pid: number = 0;
  private _points: number;
  private _lastActive: Date;
  private _instance: IMapInstance | null;
  private _isAlive: boolean;
  private _intents: IntentType[];
  private readonly _speed: number = 20;
  private _playerID: number;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    lastActive: Date,
    isAlive: boolean,
    instance: IMapInstance | null
    ) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Set initial points to 0
    Set initial instance to null
    Set "lastActive" to the current Date
    Set "isAlive" to true
    Set "objecttype" to GameObjectType.Player
    */

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

  public get instance(): IMapInstance | null {
    return this._instance;
  }

  public set instance(instance: IMapInstance | null) {
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

  public get speed(): number {
    return this._speed;
  }

  public update(intents: IntentType[]): void {
    /* Do not implement yet
    Logic pending on clarifying the update cycle throughout game objects
    */
  }
}
