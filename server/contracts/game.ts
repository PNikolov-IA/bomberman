import { IMapInstance } from './mapinstance';
import { IPlayer } from './player';

export interface IGame {
  getPlayers(): IPlayer[];
  getInstances(): IMapInstance[];
  getStarted(): Date;
  getIsActive(): boolean;
}
