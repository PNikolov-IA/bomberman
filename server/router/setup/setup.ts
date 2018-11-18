// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-import-side-effect
import '../controller/home';

import { Container } from 'inversify';

// Load everything needed to the Container
const container: Container = new Container();

export { container };
