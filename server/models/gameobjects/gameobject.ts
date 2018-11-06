import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';

export class GameObject implements IGameObject {
  protected _objecttype: GameObjectType;
  private readonly _x: number;
  private readonly _y: number;
  private readonly _width: number;
  private readonly _height: number;

  public constructor (x: number, y: number, height: number, width: number) {
    /* Implement validators for the fields passed in the constructor
    Validators are uniform across extended classes based on GameObject
    */
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get objecttype(): GameObjectType {
    return this._objecttype;
  }
}
