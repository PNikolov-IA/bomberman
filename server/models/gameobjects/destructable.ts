import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';
import { GameObject } from './gameobject';

export class Destructable extends GameObject implements IGameObject {
  public constructor(x: number, y: number, width: number, height: number, id: number) {
    super(x, y, height, width, id);
    this._objecttype = GameObjectType.Destructable;
  }
}
