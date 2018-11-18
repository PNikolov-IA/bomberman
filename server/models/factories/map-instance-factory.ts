import { inject, injectable } from 'inversify';
import { ICommandsController, MapType } from '../../common';
import { IMapInstance, IMapInstanceFactory } from '../../contracts';
import { MapInstance } from '../../controllers';
import { TYPES } from '../../setup/types';
import { GameObjectFactory } from './game-object-factory';

@injectable()
export class MapInstanceFactory implements IMapInstanceFactory {

  private _factory: GameObjectFactory;
  private _commandscontroller: ICommandsController;

  public constructor(
    @inject(TYPES.gameobjectfactory) factory: GameObjectFactory,
    @inject(TYPES.commandscontroller) commandscontroller: ICommandsController
    ) {
    this._factory = factory;
    this._commandscontroller = commandscontroller;
  }

  public create(maptype: MapType): IMapInstance {
    return new MapInstance(maptype, this._factory, this._commandscontroller);
  }
}
