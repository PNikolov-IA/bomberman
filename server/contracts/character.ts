import { IGameObject } from './gameobject';

export interface ICharacter extends IGameObject {
  isAlive: boolean;
  speed: number;
}
