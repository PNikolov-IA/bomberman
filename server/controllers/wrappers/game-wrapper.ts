import { inject, injectable } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import * as IO from 'socket.io';
import { GameServer } from '../../router/server';

@injectable()
class GameWrapper {
  private _socketIO: IO.Server;
  private _gameserver: GameServer;

  public constructor(@inject('server') gameserver: GameServer) {
    this._gameserver = gameserver;
  }

  public start(): void {
    this._socketIO = IO.listen(this._gameserver.app);

    this.hook();
  }

  private hook(): void {
    this._socketIO.on('connection', (socket: IO.Server) => {
      socket.emit('message', 'connected');
    });
  }
}

export { GameWrapper };
