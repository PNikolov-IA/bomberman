import { inject } from 'inversify';
import { GameObjectType, GLOBALS, IIntentWrap, IntentType, IUser, MapType } from '../../common';
import { ICommandsController } from '../../common/commands';
import { IGameObjectFactory, IMapInstance, IPlayer, IPoint } from '../../contracts';
import { MAPS } from '../../data/maps';
import { TYPES } from '../../setup/types';
import { IGameObject } from './../../contracts/gameobject';

const MOVE_STEP: number = 3;
export class MapInstance implements IMapInstance {
  private static pid: number = 0;
  private _players: IPlayer[];
  private readonly factory: IGameObjectFactory;
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
  private _commandscontroller: ICommandsController;

  public constructor(mapType: MapType,
                     @inject(TYPES.gameobjectfactory) factory: IGameObjectFactory,
                     @inject(TYPES.commandscontroller) commandscontroller: ICommandsController) {
    this.factory = factory;
    this._commandscontroller = commandscontroller;
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
      const player: IPlayer = this.factory.createPlayer(45, 45);
      user.join();
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
    const intentions: IIntentWrap[] = this._commandscontroller.commands;
    const ids: number[] = this._players.map((player: IPlayer) => player.userID);

    intentions.forEach((intent: IIntentWrap) => {
      if (ids.indexOf(intent.id) >= 0) {

        const player: IPlayer | undefined = this._players.find((element: IPlayer) => element.userID === intent.id);

        if (!player) {
          return;
        }

        let canMoveLeft: boolean = true;
        let canMoveRight: boolean = true;
        let canMoveUp: boolean = true;
        let canMoveDown: boolean = true;

        let moved: boolean = false;

        this._objects.forEach((object: IGameObject) => {
          if (object.objecttype === GameObjectType.Indestructable ||
              object.objecttype === GameObjectType.Destructable ||
              object.objecttype === GameObjectType.Boundary) {
                if (Math.abs(object.x - player.x) < 3) {
                  if (object.y - player.y > 20 && object.y - player.y <= 30) {
                    canMoveDown = false;
                  }
                  if (player.y - object.y > 20 && player.y - object.y <= 30) {
                    canMoveUp = false;
                  }
                }

                if (Math.abs(object.y - player.y) < 3) {
                  if (object.x - player.x > 20 && object.x - player.x <= 30) {
                    canMoveRight = false;
                  }
                  if (player.x - object.x > 20 && player.x - object.x <= 30) {
                    canMoveLeft = false;
                  }
                }
              }
        });

        if ((player.x - 15) % 30) {
          canMoveDown = false;
          canMoveUp = false;
        }

        if ((player.y - 15) % 30) {
          canMoveLeft = false;
          canMoveRight = false;
        }

        // Debug: console.log(canMoveLeft, canMoveRight, canMoveUp, canMoveDown, player.x, player.y);

        if (intent.intentions.indexOf(IntentType.Up) >= 0 && canMoveUp && !moved) {
          player.updatePos(player.x, player.y - MOVE_STEP);
          moved = true;
        }
        if (intent.intentions.indexOf(IntentType.Down) >= 0 && canMoveDown && !moved) {
          player.updatePos(player.x, player.y + MOVE_STEP);
          moved = true;
        }
        if (intent.intentions.indexOf(IntentType.Left) >= 0 && canMoveLeft && !moved) {
          player.updatePos(player.x - MOVE_STEP, player.y);
          moved = true;
        }
        if (intent.intentions.indexOf(IntentType.Right) >= 0 && canMoveRight && !moved) {
          player.updatePos(player.x + MOVE_STEP, player.y);
          moved = true;
        }

        this._commandscontroller.clear(intent.id);
      }
    });

    // Create exportable object data
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
    const mapData: any = MAPS[this._mapType];

    // Create all boundaries
    mapData.boundaries.forEach((object: { x: number; y: number }) => {
      const gameobj: IGameObject = this.factory.createBoundary(object.x * GLOBALS.tilewidth - GLOBALS.tilewidth / 2,
                                                               object.y * GLOBALS.tileheigth - GLOBALS.tileheigth / 2);
      this._objects.push(gameobj);
    });

    // Create all indestructable objects
    mapData.indestructables.forEach((object: { x: number; y: number }) => {
      const gameobj: IGameObject = this.factory.createIndestructable(object.x * GLOBALS.tilewidth - GLOBALS.tilewidth / 2,
                                                                     object.y * GLOBALS.tileheigth - GLOBALS.tileheigth / 2);
      this._objects.push(gameobj);
    });

    // Create all destructable objects
    mapData.destructables.forEach((object: { x: number; y: number }) => {
      const gameobj: IGameObject = this.factory.createDestructable(object.x * GLOBALS.tilewidth - GLOBALS.tilewidth / 2,
                                                                   object.y * GLOBALS.tileheigth - GLOBALS.tileheigth / 2);
      this._objects.push(gameobj);
    });

    // Create all enemies
    mapData.enemies.forEach((object: { x: number; y: number; path: IPoint[] }) => {
      const gameobj: IGameObject = this.factory.createEnemy(object.x * GLOBALS.tilewidth - GLOBALS.tilewidth / 2,
                                                            object.y * GLOBALS.tileheigth - GLOBALS.tileheigth / 2,
                                                            object.path);
      this._enemies.push(gameobj);
    });
  }
}
