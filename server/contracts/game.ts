import { ISubscriber } from '../common/subscriber';
import { IMapInstance } from './mapinstance';

export interface IGame {
  subscribers: ISubscriber[];
  instances: IMapInstance[];
  started: Date;
  isActive: boolean;
}
