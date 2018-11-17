import { inject, injectable } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import * as IO from 'socket.io';
import { IUser } from '../../common';
import { IGame, IGameWrapper, IUserFactory } from '../../contracts';
import { GameServer } from '../../router/server';
import { TYPES } from '../../setup/types';
import { Game } from './game';

@injectable()
class GameWrapper implements IGameWrapper {
  protected static usersCount: number = 0;
  private _game: IGame;
  private _userfactory: IUserFactory;
  private _socketIO: IO.Server;
  private _gameserver: GameServer;

  public constructor(
    @inject('server') gameserver: GameServer,
    @inject(TYPES.game) game: IGame,
    @inject(TYPES.userfactory) userfactory: IUserFactory
    ) {
    this._gameserver = gameserver;
    this._game = game;
    this._userfactory = userfactory;
  }

  public start(): void {
    this._socketIO = IO.listen(this._gameserver.app);

    this.hook();
  }

  private hook(): void {
    this._socketIO.on('connection', (socket: IO.Server) => {

      // Connect to the game
      const user: IUser = this._userfactory.create(GameWrapper.usersCount += 1);
      if (this._game.join({ user: user, socket: socket })) {
        // Welcome to the server
        socket.emit('message', 'Welcome to Bomberman Online!');
      } else {
        socket.emit('message', 'Something went wrong, please refresh the webpage.');
      }

      // On create game request
      socket.on('create', (layout: string) => {
        this._game.create(user);
        socket.emit('join', '1');
      });

      // Disconnect from the game
      socket.on('disconnect', () => {
        this._game.leave(user);
      });
    });
  }
}

export { GameWrapper };
