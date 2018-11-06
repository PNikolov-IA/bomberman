import { IntentType, MapType } from '../../common';
import { ICharacter, IMapInstance, IPlayer } from '../../contracts';

export class MapInstance implements IMapInstance {
  private static pid: number = 0;
  public players: IPlayer[];
  public enemies: ICharacter[];
  public lastActive: Date;
  public playersCount: number;
  public readonly maxPlayersCount: number = 4;
  // Maximum time with no players in the instance before it's destroyed
  public readonly maxTimeDormant: number = 900;
  private _id: number;
  private _mapType: MapType;

  public constructor(mapType: MapType) {
    this._id = MapInstance.pid += 1;
    this._mapType = mapType;

    /* Create getters for all public properties and encapsulate them
    Initialize "players", "enemies" to blank "[]"
    initialize "lastActive" field
    */

    this.load(this._mapType);
  }

  public get id(): number {
    return this._id;
  }

  public canJoin(player: IPlayer): boolean {
    /* Implement
    Player can join if:
    - the instance is not full -> playersCount < maxPlayersCount
    - the player hasn't joined in already (check the player.playerID)
    Return if the player can join or not
    */
   return false;
  }

  public join(player: IPlayer): void {
    /* add the player to the player list
    Make sure you make the necessary checks first
    If the player is added to the instance, update the player.instance to match the instance
    */
  }

  public remove(player: IPlayer): void {
    /* remove the player to the player list
    Make sure you make the necessary checks first
    If the player is removed to the instance, update the player.instance to null
    */
  }

  public update(): void {
    /* Do not implement yet
    This will be tied to controller/keyboard triggers sent over the net
    */
  }

  private load(mapType: MapType): void {
    /* Do not implement yet
    This will be set up once we have json map loaders and object factories in place
    */
  }
}
