import { injectable } from 'inversify';

export interface INUser {
  email: string;
  name: string;
}

@injectable()
export class UserService {

  private userStorage: INUser[] = [{
    email: 'lorem@ipsum.com',
    name: 'Lorem'
  }, {
    email: 'doloe@sit.com',
    name: 'Dolor'
  }];

  public getUsers(): INUser[] {
    return this.userStorage;
  }

  public getUser(id: string): INUser {
    this.userStorage.map((user: INUser) => {
      if (user.name === id) {
        return user;
      }
    });

    return { email: '', name: '' };
  }

  public newUser(user: INUser): INUser {
    this.userStorage.push(user);

    return user;
  }

  public updateUser(id: string, user: INUser): INUser {
    this.userStorage.map((entry: INUser, index: number) => {
      if (entry.name === id) {
        this.userStorage[index] = user;
      }
    });

    return user;
  }

  public deleteUser(id: string): string {
    const updatedUser: INUser[] = [];
    this.userStorage.map((user: INUser) => {
      if (user.name !== id) {
        updatedUser.push(user);
      }
    });

    this.userStorage = updatedUser;

    return id;
  }
}
