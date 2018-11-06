import { injectable } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import * as bodyParser from 'body-parser';

import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './setup/setup';

import { Server } from 'http';

const port: string = process.env.PORT || '5000';

@injectable()
class GameServer {
  private _server: InversifyExpressServer;
  private _serverInstance: express.Application;
  private _app: Server;

  public constructor() {
    this._server = new InversifyExpressServer(container);
    this._server.setConfig((expressApp: express.Application) => {
      expressApp.use(bodyParser.urlencoded({
        extended: true
      }));
      expressApp.use(bodyParser.json());
      expressApp.use(express.static(`./public`));
    });

    this._serverInstance = this._server.build();
    this._app = this._serverInstance.listen(port);

    console.log(`Server started on port ${port}`);
  }

  public get app(): Server {
    return this._app;
  }

}

export { GameServer };
