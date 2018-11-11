import { Container } from 'inversify';
import { GameWrapper } from '../controllers';
import { GameObjectFactory } from '../models/factories/game-object-factory';
import { MapInstanceFactory } from '../models/factories/map-instance-factory';
import { UserFactory } from '../models/factories/user-factory';
import { GameServer } from '../router/server';
import { Game } from './../controllers/wrappers/game';
import { TYPES } from './types';

const container: Container = new Container();

container.bind('server').to(GameServer).inSingletonScope();
container.bind(TYPES.game).to(Game).inSingletonScope();
container.bind(TYPES.gamewrapper).to(GameWrapper).inSingletonScope();

// Factrories
container.bind(TYPES.gameobjectfactory).to(GameObjectFactory).inSingletonScope();
container.bind(TYPES.mapinstancefacory).to(MapInstanceFactory).inSingletonScope();
container.bind(TYPES.userfactory).to(UserFactory).inSingletonScope();

export { container };
