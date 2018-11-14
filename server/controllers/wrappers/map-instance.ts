import { inject } from 'inversify';
import { GameObjectType, GLOBALS, IntentType, IUser, MapType } from '../../common';
import { ICharacter, IMapInstance, IPlayer, IPoint } from '../../contracts';
import { MAPS } from '../../data/maps';
import { TYPES } from '../../setup/types';
import { IGameObject } from './../../contracts/gameobject';
import { GameObjectFactory } from './../../models/factories/game-object-factory';
import { Destructable } from './../../models/gameobjects/destructable';

export class MapInstance implements IMapInstance {
  private static pid: number = 0;
  private _players: IPlayer[];
  private readonly factory: GameObjectFactory;
  private _enemies: IGameObject[];
  private _objects: IGameObject[];
  private _exports: IGameObject[];
  private _lastActive: Date;
  private _playersCount: number = 0;
  private readonly _maxPlayersCount: number = 4;
  // Maximum time with no players in the instance before it's destroyed
  private readonly maxTimeDormant: number = 900;
  private _id: number;
  private _mapType: MapType;
  private _completed: boolean = false;

  public constructor(mapType: MapType, @inject(TYPES.gameobjectfactory) factory: GameObjectFactory) {
    this.factory = factory;
    this._id = MapInstance.pid += 1;
    this._mapType = mapType;
    this._players = [];
    this._enemies = [];
    this._objects = [];
    this._exports = [];
    this._lastActive = new Date();

    this.load(this._mapType);
  }
  public get players(): IPlayer[] {
    return this._players;
  }
  public get enemies(): IGameObject[] {
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

  public get exports(): IGameObject[] {
    return this._exports;
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
      player.userID = user.id;
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

    this._exports = this.enumerate();
  }

  public objects(): IGameObject[] {
    return this._objects;
  }

  // tslint:disable-next-line:no-any
  private enumerate(): IGameObject[] {
    // tslint:disable-next-line:no-any
    const all: any[] = [];
    this._objects.forEach((object: IGameObject) => {
      if (object.objecttype !== GameObjectType.Boundary) {
        all.push({
          x: object.x, y: object.y,
          width: object.width, height: object.height, objecttype: object.objecttype,
          id: object.id
        });
      }
    });
    this._enemies.forEach((object: IGameObject) => {
      all.push({
        x: object.x, y: object.y,
        width: object.width, height: object.height, objecttype: object.objecttype,
        id: object.id
      });
    });
    this._players.forEach((object: IPlayer) => {
      all.push({
        x: object.x, y: object.y,
        width: object.width, height: object.height, objecttype: object.objecttype,
        id: object.id, userID: object.userID
      });
    });

    return all;
  }

  private load(mapType: MapType): void {
    // tslint:disable-next-line:no-any
    const mapData: any = MAPS[MapType.Woods];

    // Create all boundaries
    mapData.boundaries.forEach((object: { x: number; y: number }) => {
      const gameobj: IGameObject = this.factory.createBoundary(object.x * GLOBALS.tilewidth, object.y * GLOBALS.tileheigth);
      this._objects.push(gameobj);
    });

    // Create all indestructable objects
    mapData.indestructables.forEach((object: { x: number; y: number }) => {
      const gameobj: IGameObject = this.factory.createIndestructable(object.x * GLOBALS.tilewidth, object.y * GLOBALS.tileheigth);
      this._objects.push(gameobj);
    });

    // Create all destructable objects
    mapData.destructables.forEach((object: { x: number; y: number }) => {
      const gameobj: IGameObject = this.factory.createDestructable(object.x * GLOBALS.tilewidth, object.y * GLOBALS.tileheigth);
      this._objects.push(gameobj);
    });

    // Create all enemies
    mapData.enemies.forEach((object: { x: number; y: number; path: IPoint[] }) => {
      const gameobj: IGameObject = this.factory.createEnemy(object.x * GLOBALS.tilewidth, object.y * GLOBALS.tileheigth, object.path);
      this._enemies.push(gameobj);
    });
  }
}
