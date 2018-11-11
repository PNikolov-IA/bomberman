import { inject } from 'inversify';
import { IntentType, IUser, MapType } from '../../common';
import { ICharacter, IMapInstance, IPlayer } from '../../contracts';
import { TYPES } from '../../setup/types';
import { IGameObject } from './../../contracts/gameobject';
import { GameObjectFactory } from './../../models/factories/game-object-factory';

export class MapInstance implements IMapInstance {
  private static pid: number = 0;
  private _players: IPlayer[];
  private readonly factory: GameObjectFactory;
  private _enemies: ICharacter[];
  private _objects: IGameObject[];
  private _lastActive: Date;
  private _playersCount: number = 0;
  private readonly _maxPlayersCount: number = 4;
  // Maximum time with no players in the instance before it's destroyed
  private readonly maxTimeDormant: number = 900;
  private _id: number;
  private _mapType: MapType;
  private _completed: boolean = false;

  public constructor(mapType: MapType, factory: GameObjectFactory) {
    this.factory = factory;
    this._id = MapInstance.pid += 1;
    this._mapType = mapType;
    this._players = [];
    this._enemies = [];
    this._lastActive = new Date();

    this.load(this._mapType);
  }
  public get players(): IPlayer[] {
    return this._players;
  }
  public get enemies(): ICharacter[] {
    return this._enemies;
  }
  public get lastActive(): Date {
    return this._lastActive;
  }
  public get playersCount(): number {
    return this._playersCount;
  }
  public get maxPlayersCount(): number {
    return this._maxPlayersCount;
  }

  public get id(): number {
    return this._id;
  }

  public canJoin(user: IUser): boolean {
    const indexInGame: number = this._players.map((_player: IPlayer) => (_player.userID)).indexOf(user.id);
    if (this._playersCount < this._maxPlayersCount && indexInGame < 0) {
      return true;
    } else {
      return false;
    }
  }

  public hasUser(user: IUser): boolean {
    let hasUser: boolean = false;
    this.players.forEach((player: IPlayer) => {
      if (player.userID === user.id) {
        hasUser = true;
      }
    });

    return hasUser;
  }

  public join(user: IUser): void {
    if (this.canJoin(user)) {
      const player: IPlayer = this.factory.createPlayer(250, 250);
      this._players.push(player);
      player.instance = this;
      this._playersCount += 1;
    }

  }

  public remove(user: IUser): void {

    const indexOfPlayer: number = this._players.map((_player: IPlayer) => (_player.userID)).indexOf(user.id);
    if (indexOfPlayer >= 0) {
      const player: IPlayer = this._players[indexOfPlayer];
      this._players.splice(indexOfPlayer, 1);
      player.instance = null;
      this._playersCount -= 1;
      user.leave();
    }
  }

  public update(): void {
    /* Do not implement yet
    This will be tied to controller/keyboard triggers sent over the net
    */
  }

  public objects(): IGameObject[] {
    return this._objects;
  }

  public enumerate(): IGameObject[] {
    const all: IGameObject[] = [];
    this._objects.forEach((object: IGameObject) => {
      all.push(object);
    });
    this._enemies.forEach((object: IGameObject) => {
      all.push(object);
    });
    this._players.forEach((object: IGameObject) => {
      all.push(object);
    });

    return all;
  }

  private load(mapType: MapType): void {
    /* Do not implement yet
    This will be set up once we have json map loaders and object factories in place
    */
  }
}
