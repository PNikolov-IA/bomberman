import * as IO from 'socket.io';
import { IUser } from './user';

export interface ISubscriber {
  user: IUser;
  socket: IO.Server;
}
