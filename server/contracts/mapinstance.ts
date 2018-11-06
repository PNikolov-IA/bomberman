import { ICharacter } from './character';
import { IPlayer } from './player';

export interface IMapInstance {
  players: IPlayer[];
  enemies: ICharacter[];
  lastActive: Date;
  playersCount: number;
  maxPlayersCount: number;
}
