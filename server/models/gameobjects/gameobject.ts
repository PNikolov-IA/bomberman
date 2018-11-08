import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';
export class GameObject implements IGameObject {
  protected _objecttype: GameObjectType;
  private _x: number;
  private _y: number;
  private readonly _width: number;
  private readonly _height: number;

  public constructor (x: number, y: number, height: number, width: number) {
    /*
    if ((x < 0) || (y < 0) || (height < 0) || (width < 0)) {
      throw new Error(`Position and dimentions cannot be negative numbers!`);
    } */
    this._x = x < 0 ? 0 : x; // Without throwing error
    this._y = y < 0 ? 0 : y;
    this._height = height < 0 ? 0 : height;
    this._width = width < 0 ? 0 : width;

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
