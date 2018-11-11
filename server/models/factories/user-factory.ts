import { injectable } from 'inversify';
import { IUser } from '../../common';
import { User } from '../users/user';

@injectable()
export class UserFactory {
  public constructor() {
    // Nothing
  }

  public create(id: number): IUser {
    return new User(id);
  }
}
