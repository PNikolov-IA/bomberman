import { IGameObject } from '.';
import { IUser, MapType } from '../common';
import { IPlayer } from './player';

export interface IMapInstance {
  players: IPlayer[];
  enemies: IGameObject[];
  lastActive: Date;
  playersCount: number;
  maxPlayersCount: number;
  id: number;
  exports: IGameObject[];
  objects(): IGameObject[];
  canJoin(user: IUser): boolean;
  hasUser(user: IUser): boolean;
  join(user: IUser): void;
  remove(user: IUser): void;
  update(): void;
}
