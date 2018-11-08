import { IGameObject } from '../../contracts';
import { GameObject } from './gameobject';
import { GameObjectType } from '../../common';

export class Destructable extends GameObject implements IGameObject {
  public constructor(x: number, y: number, width: number, height: number) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Set "objecttype" to GameObjectType.Bomb
    */
   this._objecttype = GameObjectType.Bomb;
  }
}
