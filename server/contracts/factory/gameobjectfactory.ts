import { IGameObject, IPlayer, IPoint } from '.';

export interface IGameObjectFactory {
  createBomb(x: number, y: number): IGameObject;
  createBoundary(x: number, y: number): IGameObject;
  createDestructable(x: number, y: number): IGameObject;
  createEnemy(x: number, y: number, path: IPoint[]): IGameObject;
  createIndestructable(x: number, y: number): IGameObject;
  createPlayer(x: number, y: number): IPlayer;
}
