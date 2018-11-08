import { PathDirection, GameObjectType } from '../../common';
import { IGameObject, IPoint } from '../../contracts';
import { GameObject } from './gameobject';

export class Enemy extends GameObject implements IGameObject {
  private readonly _path: IPoint[];
  private readonly _direction: PathDirection;
  private readonly _pathPosition: number;

  public constructor(x: number, y: number, width: number, height: number, path: IPoint[]) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Property "path" should return direct referrence to the array for testing purposes
    Implement validator for "path"
    Set "objecttype" to GameObjectType.Enemy
    Set _direction to PathDirection.Forward
    */

    if (Array.isArray(path)) {   // ??? something more 
      if ((path[0] !== undefined && path[1] !== undefined) &&
        (path[0].x >= 0 && path[0].x < width) &&    // ??? first or last element
        (path[0].y >= 0 && path[0].y < height)
      ) {
        this._path = path;
      }
    } else {
      [];
    }

    this._objecttype = GameObjectType.Enemy;
    this._direction = PathDirection.Forward;
    this._pathPosition = 0;                      // ??? 
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

  public get pathPosition(): PathDirection {
    return this._pathPosition;
  }
}
