// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { IUser } from '../../server/common';
import { IGameObject } from '../../server/contracts';
import { User } from '../../server/models/users/user';
import { IUserFactory } from './../../server/contracts/factory/userfactory';
import { UserFactory } from './../../server/models/factories/user-factory';

describe('UserFactory', () => {
    describe('create should', () => {
        it('create an instance of class User', () => {
            // Arrange
            const userFactory: IUserFactory = new UserFactory();
            const user: User = new User(200);

            // Act
            const result: IUser = userFactory.create(200);

            // Assert
            expect(result).toBeInstanceOf(User);
        });
        it('return correct User object with correctly assigned id', () => {
            // Arrange
            const userFactory: IUserFactory = new UserFactory();
            const user: User = new User(200);

            // Act
            const result: IUser = userFactory.create(200);

            // Assert
            expect(result.id).toBe(200);
        });
    });
});
