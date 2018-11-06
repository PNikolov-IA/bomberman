import { IGame, IMapInstance, IPlayer } from '../../contracts';

export class Game implements IGame {
  public players: IPlayer[];
  public instances: IMapInstance[];
  public started: Date;
  public isActive: boolean;

  public constructor() {
    /* Initialize "started" field
    Encapsulate all the properties and implement getters
    Fields "players" and "instances" should return original array for testing purposes
    */
  }
}
