import { GameWrapper } from './server/controllers';
import { container } from './server/setup/ioc.config';
import { TYPES } from './server/setup/types';

// tslint:disable-next-line:no-backbone-get-set-outside-model
const wrapper: GameWrapper = container.get(TYPES.gamewrapper);

wrapper.start();
