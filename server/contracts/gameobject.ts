import { GameObjectType } from '../common/gameobjecttype';

export interface IGameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  objecttype: GameObjectType;
  updatePos(x: number, y: number): void;
}
