import { Container } from 'inversify';
import { GameWrapper } from '../controllers';
import { GameServer } from '../router/server';

const container: Container = new Container();

container.bind('server').to(GameServer).inSingletonScope();
container.bind('gamewrapper').to(GameWrapper).inSingletonScope();

export { container };
