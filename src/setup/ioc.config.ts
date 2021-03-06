import { Container } from 'inversify';
import { CommandsController,
  CreateGameController,
  GameObjectHolderController,
  InstanceListController,
  MenuController
 } from '../controllers';
import { EventWrapper, Notifier } from '../services';
import { InstanceTemplate } from '../templates/instance';
import { TYPES } from './types';

const container: Container = new Container();

// Controllers
container.bind(TYPES.creategamecontroller).to(CreateGameController).inSingletonScope();
container.bind(TYPES.commandscontroller).to(CommandsController).inSingletonScope();
container.bind(TYPES.gameobjectholdercontroller).to(GameObjectHolderController).inSingletonScope();
container.bind(TYPES.menucontroller).to(MenuController).inSingletonScope();
container.bind(TYPES.instancelistcontroller).to(InstanceListController).inSingletonScope();

// Services
container.bind(TYPES.notifier).to(Notifier).inSingletonScope();
container.bind(TYPES.eventwrapper).to(EventWrapper).inSingletonScope();

// Templates
container.bind(TYPES.instancetemplate).to(InstanceTemplate).inSingletonScope();

export { container };
