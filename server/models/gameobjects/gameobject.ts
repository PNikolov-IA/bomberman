import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';
export class GameObject implements IGameObject {
  protected _objecttype: GameObjectType;
  private _x: number;
  private _y: number;
  private _id: number;
  private readonly _width: number;
  private readonly _height: number;

  public constructor(x: number, y: number, height: number, width: number, id: number) {

    // Validation for x and y cordinates of the position of GameObject;
    if (x === undefined) {
      throw new Error(`missing argument "x"`);
    }
    if (y === undefined) {
      throw new Error(`missing argument "y"`);
    }
    if (height === undefined) {
      throw new Error(`missing argument "height"`);
    }

    if (width === undefined) {
      throw new Error(`missing argument "width"`);
    }

    if (id === undefined) {
      throw new Error(`missing argument "id"`);
    }

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._id = id;
  }

  public get id(): number {
    return this._id;
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

  public updatePos(x: number, y: number): void {
    // Validation of x and y before update of the positon
    if (x === undefined) {
      throw new Error(`missing argument "x"`);
    }
    if (y === undefined) {
      throw new Error(`missing argument "y"`);
    }

    this._x = x;
    this._y = y;
  }
}
