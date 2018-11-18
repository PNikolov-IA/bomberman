// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { container } from './setup/ioc.config';

import { EventWrapper } from './services';
import { TYPES } from './setup/types';

const connection: EventWrapper = container.get(TYPES.eventwrapper);
