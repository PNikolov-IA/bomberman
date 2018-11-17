import { inject, injectable } from 'inversify';
import { MapType } from '../../common';
import { IMapInstance, IMapInstanceFactory } from '../../contracts';
import { MapInstance } from '../../controllers';
import { TYPES } from '../../setup/types';
import { GameObjectFactory } from './game-object-factory';

@injectable()
export class MapInstanceFactory implements IMapInstanceFactory {

  private _factory: GameObjectFactory;

  public constructor(@inject(TYPES.gameobjectfactory) factory: GameObjectFactory) {
    this._factory = factory;
  }

  public create(maptype: MapType): IMapInstance {
    return new MapInstance(maptype, this._factory);
  }
}
