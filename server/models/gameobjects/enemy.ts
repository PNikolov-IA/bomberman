import { GameObjectType, PathDirection } from '../../common';
import { IGameObject, IPoint } from '../../contracts';
import { GameObject } from './gameobject';

export class Enemy extends GameObject implements IGameObject {
  private readonly _path: IPoint[];
  private _direction: PathDirection;
  private _pathPosition: number;

  public constructor(x: number, y: number, width: number, height: number, id: number, path: IPoint[]) {
    super(x, y, height, width, id);
    if (!path) {
      throw new Error('No path defined');
    }
    this._path = path;
    this._objecttype = GameObjectType.Enemy;
    this._direction = PathDirection.Forward;
    this._pathPosition = 0;
  }

  public get path(): IPoint[] {
    return this._path;
  }

  public get objecttype(): GameObjectType {
    return this._objecttype;
  }

  public get direction(): PathDirection {
    return this._direction;
  }

  public set direction(direction: PathDirection) {
    this._direction = direction;
  }

  public get pathPosition(): PathDirection {
    return this._pathPosition;
  }

  public set pathPosition(position: PathDirection) {
    this._pathPosition = position;
  }
}
