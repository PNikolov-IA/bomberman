import { inject, injectable } from 'inversify';
import { MapType } from '../../common';
import { IMapInstance } from '../../contracts';
import { MapInstance } from '../../controllers';
import { TYPES } from '../../setup/types';
import { GameObjectFactory } from './game-object-factory';

@injectable()
export class MapInstanceFactory {

  @inject(TYPES.gameobjectfactory)
  private factory: GameObjectFactory;

  public constructor() {
    // Nothing
  }

  public create(maptype: MapType): MapInstance {
    return new MapInstance(maptype, this.factory);
  }
}
