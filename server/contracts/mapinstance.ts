import { ICharacter } from './character';
import { IPlayer } from './player';

export interface IMapInstance {
  getPlayers(): IPlayer[];
  getEnemies(): ICharacter[];
  getLastActive(): Date;
  getPlayersCount(): number;
  getMaxPlayersCount(): number;
}
