import { inject, injectable } from 'inversify';
import { MapInstance } from '..';
import { IUser, MapType } from '../../common';
import { ISubscriber } from '../../common/subscriber';
import { IGame, IMapInstance, IPlayer } from '../../contracts';
import { MapInstanceFactory } from '../../models/factories/map-instance-factory';
import { TYPES } from '../../setup/types';

@injectable()
export class Game implements IGame {
  @inject(TYPES.mapinstancefacory)
  private instancefactory: MapInstanceFactory;
  private _subscribers: ISubscriber[];
  private _instances: MapInstance[];
  private readonly _started: Date;
  private _isActive: boolean;

  public constructor() {
    this._subscribers = [];
    this._instances = [];
    this._started = new Date();
    this._isActive = false;
  }

  public join(sub: ISubscriber): boolean {
    let joined: boolean = true;
    this.subscribers.forEach((subscriber: ISubscriber) => {
      if (subscriber.user.id === sub.user.id) {
        joined = false;
      }
    });
    if (joined) {
      this._subscribers.push(sub);
      if (!this._isActive) {
        this._isActive = true;
        setTimeout(this.update.bind(this));
      }
    }

    return joined;
  }

  public leave(user: IUser): void {
    this._subscribers = this._subscribers.filter((subscriber: ISubscriber) => {
      if (subscriber.user.id === user.id) {
        return false;
      }

      return true;
    });
  }

  public create(user: IUser): void {
    const mapInstance: MapInstance = this.instancefactory.create(MapType.Woods);
    mapInstance.join(user);
    user.join();
    this._instances.push(mapInstance);
  }

  public update(): void {
    // If no users cancel the update and set the game to inactive
    if (!this._subscribers.length) {
      this._isActive = false;

      return;
    }

    const instancesData: {id: number; players: number; maxPlayers: number; layout: number}[] = [];

    // Update all instances
    this._instances.forEach((instance: MapInstance) => {
      // To-Do: Need to check if the instance should be updated or removed
      instance.update();
      instancesData.push({
        id: instance.id,
        players: instance.playersCount,
        maxPlayers: instance.maxPlayersCount,
        layout: 1});
    });

    const instanceResponce: string = JSON.stringify({instances: instancesData});

    this._subscribers.forEach((subscriber: ISubscriber) => {
      if (!subscriber.user.ingame) {
        // Send instance data
        subscriber.socket.emit('serverdata', instanceResponce);
      } else {
        // Send updated game object data
      }
    });

    setTimeout(this.update.bind(this), 50);
  }

  public get subscribers(): ISubscriber[] {
    return this._subscribers;
  }

  public get instances(): IMapInstance[] {
    return this._instances;
  }

  public get started(): Date {
    return this._started;
  }

  public get isActive(): boolean {
    return this._isActive;
  }
}
