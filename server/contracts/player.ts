import { ICharacter } from './character';
import { IMapInstance } from './mapinstance';

export interface IPlayer extends ICharacter {
  playerID: number;
  points: number;
  lastActive: Date;
  instance: IMapInstance;
}
