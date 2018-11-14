import { inject, injectable } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import * as IO from 'socket.io';
import { IUser } from '../../common';
import { UserFactory } from '../../models/factories/user-factory';
import { GameServer } from '../../router/server';
import { TYPES } from '../../setup/types';
import { Game } from './game';

@injectable()
class GameWrapper {
  protected static usersCount: number = 0;
  @inject(TYPES.game)
  private game: Game;
  @inject(TYPES.userfactory)
  private userfactory: UserFactory;
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

      // Connect to the game
      const user: IUser = this.userfactory.create(GameWrapper.usersCount += 1);
      if (this.game.join({ user: user, socket: socket })) {
        // Welcome to the server
        socket.emit('message', 'Welcome to Bomberman Online!');
      } else {
        socket.emit('message', 'Something went wrong, please refresh the webpage.');
      }

      // On create game request
      socket.on('create', (layout: string) => {
        this.game.create(user);
        socket.emit('join', '1');
      });

      // Disconnect from the game
      socket.on('disconnect', () => {
        this.game.leave(user);
      });
    });
  }
}

export { GameWrapper };
