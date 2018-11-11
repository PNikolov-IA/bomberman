import { injectable } from 'inversify';
import { GLOBALS } from '../../common/globals';
import { IGameObject, IPlayer, IPoint } from '../../contracts';
import { Bomb, Boundary, Destructable, Enemy } from '../gameobjects';
import { Indestructable } from './../gameobjects/indestructable';
import { Player } from './../gameobjects/player';

@injectable()
export class GameObjectFactory {
  private static pid: number = 0;

  public constructor() {
    // Nothing
  }

  public createBomb(x: number, y: number): IGameObject {
    return new Bomb(x, y, GLOBALS.tilewidth, GLOBALS.tileheight, GameObjectFactory.pid += 1);
  }

  public createBoundary(x: number, y: number): IGameObject {
    return new Boundary(x, y, GLOBALS.tilewidth, GLOBALS.tileheight, GameObjectFactory.pid += 1);
  }

  public createDestructable(x: number, y: number): IGameObject {
    return new Destructable(x, y, GLOBALS.tilewidth, GLOBALS.tileheight, GameObjectFactory.pid += 1);
  }

  public createEnemy(x: number, y: number, path: IPoint[]): IGameObject {
    return new Enemy(x, y, GLOBALS.tilewidth, GLOBALS.tileheight, GameObjectFactory.pid += 1, path);
  }

  public createIndestructable(x: number, y: number): IGameObject {
    return new Indestructable(x, y, GLOBALS.tilewidth, GLOBALS.tileheight, GameObjectFactory.pid += 1);
  }

  public createPlayer(x: number, y: number): IPlayer {
    return new Player(x, y, GLOBALS.tilewidth, GLOBALS.tileheight, GameObjectFactory.pid += 1);
  }
}
