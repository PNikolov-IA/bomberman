import { IMapInstance } from './mapinstance';
import { IPlayer } from './player';

export interface IGame {
  players: IPlayer[];
  instances: IMapInstance[];
  started: Date;
  isActive: boolean;
}
