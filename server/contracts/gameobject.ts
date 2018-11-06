import { GameObjectType } from '../common/gameobjecttype';

export interface IGameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  objecttype: GameObjectType;
}
