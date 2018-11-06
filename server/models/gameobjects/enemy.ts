import { PathDirection } from '../../common';
import { IGameObject, IPoint } from '../../contracts';
import { GameObject } from './gameobject';

export class Enemy extends GameObject implements IGameObject {
  public path: IPoint[];
  private _direction: PathDirection;
  private _pathPosition: number;

  public constructor(x: number, y: number, width: number, height: number, path: IPoint[]) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Property "path" should return direct referrence to the array for testing purposes
    Implement validator for "path"
    Set "objecttype" to GameObjectType.Enemy
    Set _direction to PathDirection.Forward
    */
  }
}
