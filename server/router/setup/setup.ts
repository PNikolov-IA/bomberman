// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-import-side-effect
import '../controller/home';
// tslint:disable-next-line:no-import-side-effect
import '../controller/user';

import { Container } from 'inversify';
import { TYPES } from '../constant/types';
import { UserService } from '../service/user';

// Load everything needed to the Container
const container: Container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);

export { container };
