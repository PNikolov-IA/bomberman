import { IUser } from '../common';

export interface IUserFactory {
  create(id: number): IUser;
}
