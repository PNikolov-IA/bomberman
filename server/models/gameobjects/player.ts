import { IntentType } from '../../common';
import { IMapInstance, IPlayer } from '../../contracts';
import { GameObject } from './gameobject';

export class Player extends GameObject implements IPlayer {
  private static pid: number = 0;
  public points: number;
  public lastActive: Date;
  public instance: IMapInstance;
  public isAlive: boolean;
  public intents: IntentType[];
  private readonly _speed: number = 20;
  private _playerID: number;

  public constructor(x: number, y: number, width: number, height: number) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Set initial points to 0
    Set initial instance to null
    Set "lastActive" to the current Date
    Set "isAlive" to true
    Set "objecttype" to GameObjectType.Player
    */

    this._playerID = Player.pid += 1;
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
