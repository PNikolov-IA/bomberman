// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import { IGameObject } from '../../server/contracts';
import { Bomb } from '../../server/models/gameobjects';

describe('Bomb', () => {
    describe('timeleft should', () => {
        it('return value in 100 millisecond range', async () => {
            // Arrange
            const bomb: Bomb = new Bomb(5, 6, 32, 32, 205);

            //  Act & Assert
            let result: number | void = Infinity;
            await new Promise<void>((res: Function, rej: Function): void => {
                setTimeout(() => {
                    res(bomb.timeleft);
                },         bomb.duration);
            }).then((num: void): void => {
                result = num;
            });
            expect(result).toBeLessThan(100);
        });
    });
    describe('timeactive', () => {
        it('return value in 100 millisecond range', () => {
            // Arrange
            const bomb: Bomb = new Bomb(5, 6, 32, 32, 205);

             //  Act
            let result: number;
            result = bomb.timeactive;

            // Assert
            expect(result).toBeLessThan(100);
        });
    });
});
