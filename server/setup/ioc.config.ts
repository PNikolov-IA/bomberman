import { Container } from 'inversify';
import { IGame, IGameObjectFactory, IGameWrapper, IMapInstanceFactory, IUserFactory } from '../contracts';
import { GameWrapper } from '../controllers';
import { GameObjectFactory } from '../models/factories/game-object-factory';
import { MapInstanceFactory } from '../models/factories/map-instance-factory';
import { UserFactory } from '../models/factories/user-factory';
import { GameServer } from '../router/server';
import { Game } from './../controllers/wrappers/game';
import { TYPES } from './types';

const container: Container = new Container();

container.bind('server').to(GameServer).inSingletonScope();
container.bind<IGame>(TYPES.game).to(Game).inSingletonScope();
container.bind<IGameWrapper>(TYPES.gamewrapper).to(GameWrapper).inSingletonScope();

// Factories
container.bind<IGameObjectFactory>(TYPES.gameobjectfactory).to(GameObjectFactory).inSingletonScope();
container.bind<IMapInstanceFactory>(TYPES.mapinstancefacory).to(MapInstanceFactory).inSingletonScope();
container.bind<IUserFactory>(TYPES.userfactory).to(UserFactory).inSingletonScope();

export { container };
