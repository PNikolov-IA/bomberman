import { injectable } from 'inversify';
import { IUser } from '../../common';
import { IUserFactory } from '../../contracts';
import { User } from '../users/user';

@injectable()
export class UserFactory implements IUserFactory {
  public constructor() {
    // Nothing
  }

  public create(id: number): IUser {
    return new User(id);
  }
}
