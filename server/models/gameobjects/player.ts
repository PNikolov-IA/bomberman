import { IntentType, GameObjectType, MapType } from '../../common';
import { IMapInstance, IPlayer } from '../../contracts';
import { GameObject } from './gameobject';
import { MapInstance } from '../../controllers/wrappers/map-instance';

export class Player extends GameObject implements IPlayer {
  private static pid: number = 0;
  private readonly _points: number = 0;
  private readonly _lastActive: Date = new Date();
  private readonly _instance: IMapInstance;
  private readonly _isAlive: boolean = true;
  private readonly _intents: IntentType[];
  private readonly _speed: number = 20;
  private _playerID: number;

  public constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number,
    points: number,
    instance: IMapInstance,
    lastActive: Date,
    isAlive: boolean
    ) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Set initial points to 0
    Set initial instance to null
    Set "lastActive" to the current Date
    Set "isAlive" to true
    Set "objecttype" to GameObjectType.Player
    */

    this._points = points;
    this._instance = instance; //null; // ??? ask Stoyan
    this._lastActive = lastActive;
    this._isAlive = isAlive;
    this._objecttype = GameObjectType.Player;
    this._playerID = Player.pid += 1;
  }

  public get points(): number {
    return this._points;
  }

  public get instance(): IMapInstance {
    return this._instance;
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
