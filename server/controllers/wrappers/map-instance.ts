import { IntentType, MapType } from '../../common';
import { ICharacter, IMapInstance, IPlayer } from '../../contracts';

export class MapInstance implements IMapInstance {
  private static pid: number = 0;
  private _players: IPlayer[];
  private _enemies: ICharacter[];
  private _lastActive: Date;
  private _playersCount: number;
  private readonly _maxPlayersCount: number = 4;
  // Maximum time with no players in the instance before it's destroyed
  private readonly maxTimeDormant: number = 900;
  private _id: number;
  private _mapType: MapType;

  public constructor(
    mapType: MapType,
    lastActive: Date
  ) {
    this._id = MapInstance.pid += 1;
    this._mapType = mapType;
    this._players = [];
    this._enemies = [];
    this._lastActive = lastActive;
    /* Create getters for all public properties and encapsulate them
    Initialize "players", "enemies" to blank "[]"
    initialize "lastActive" field
    */

    this.load(this._mapType);
  }
  public get players(): IPlayer[] {
    return this._players;
  }
  public get enemies(): ICharacter[] {
    return this._enemies;
  }
  public get lastActive(): Date {
    return this._lastActive;
  }
  public get playersCount(): number {
    return this._playersCount;
  }
  public get maxPlayersCount(): number {
    return this._maxPlayersCount;
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
    const indexInGame: number = this._players.map((_player: IPlayer) => (_player.playerID)).indexOf(player.playerID);
    if (this._playersCount < this._maxPlayersCount && indexInGame < 0) {
      return true;
    } else {
      return false;
    }
  }

  public join(player: IPlayer): void {
    /* add the player to the player list
    Make sure you make the necessary checks first
    If the player is added to the instance, update the player.instance to match the instance
    */
    if (this.canJoin(player)) {
      this._players.push(player);
      player.instance = this;
      this._playersCount += 1;
    }

  }

  public remove(player: IPlayer): void {
    /* remove the player to the player list
    Make sure you make the necessary checks first
    If the player is removed to the instance, update the player.instance to null
    */
    const indexOfPlayer: number = this._players.map((_player: IPlayer) => (_player.playerID)).indexOf(player.playerID);
    if (indexOfPlayer >= 0) {
      this._players.splice(indexOfPlayer, 1);
    }
    player.instance = null;
    this._playersCount -= 1;
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
