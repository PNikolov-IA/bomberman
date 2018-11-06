import { GameObjectType } from '../../common';
import { IGameObject } from '../../contracts';
import { GameObject } from './gameobject';

export class Bomb extends GameObject implements IGameObject {
  public planted: Date;
  public timeleft: number;
  private timeactive: number;
  // Time before the bomb goes off in milliseconds
  private readonly duration: number = 2500;

  public constructor(x: number, y: number, width: number, height: number) {
    super(x, y, height, width);
    /* Encapsulate public properties and implement getters
    Set "planted" to the current Date
    Set "timeactive" to 0
    Set "objecttype" to GameObjectType.Bomb
    */
  }
}
