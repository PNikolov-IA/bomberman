import { IUser } from '../common';
import { ISubscriber } from '../common/subscriber';
import { IMapInstance } from './mapinstance';

export interface IGame {
  subscribers: ISubscriber[];
  instances: IMapInstance[];
  started: Date;
  isActive: boolean;
  join(sub: ISubscriber): boolean;
  leave(user: IUser): void;
  create(user: IUser): void;
  update(): void;
}
