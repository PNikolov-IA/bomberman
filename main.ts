import { GameWrapper } from './server/controllers';
import { container } from './server/setup/ioc.config';

// tslint:disable-next-line:no-backbone-get-set-outside-model
const wrapper: GameWrapper = container.get('gamewrapper');

wrapper.start();
