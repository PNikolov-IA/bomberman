import { IGameObject } from '.';
import { ICharacter } from './character';
import { IPlayer } from './player';

export interface IMapInstance {
  players: IPlayer[];
  enemies: IGameObject[];
  lastActive: Date;
  playersCount: number;
  maxPlayersCount: number;
}
