import { IGame, IMapInstance, IPlayer } from '../../contracts';

export class Game implements IGame {
  private _players: IPlayer[];
  private _instances: IMapInstance[];
  private readonly _started: Date;
  private readonly _isActive: boolean;

  public constructor(
    players: IPlayer[],
    instances: IMapInstance[],
    started: Date,
    isActive: boolean
  ) {
    /* Initialize "started" field
    Encapsulate all the properties and implement getters
    Fields "players" and "instances" should return original array for testing purposes
    */
   if (players === null || players === undefined) {
    this._players = [];
   }
   if (instances === null || instances === undefined) {
    this._instances = [];
   }

   this._players = players;
   this._instances = instances;
   this._started = started;
   this._isActive = isActive;
  }
  public getPlayers(): IPlayer[] {
    return this._players;
  }
  public getInstances(): IMapInstance[] {
    return this._instances;
  }
  public getStarted(): Date {
    return this._started;
  }
  public getIsActive(): boolean {
    return this._isActive;
  }
}
