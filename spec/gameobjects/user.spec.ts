// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { User } from '../../server/models/users/user';

describe('User', () => {
    describe('timeOnline should', () => {
        it('return value in 100 millisecond range', () => {
            // Arrange
            const user: User = new User(200);

             //  Act
            let result: number;
            result = user.timeOnline;

             // Assert
            expect(result).toBeLessThan(300);
        });
    });
});
