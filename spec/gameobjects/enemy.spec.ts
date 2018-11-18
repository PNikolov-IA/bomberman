// tslint:disable-next-line:no-import-side-effect
import 'jest';
import { PathDirection } from '../../server/common';
import { IPoint } from '../../server/contracts/point';
import { Enemy } from '../../server/models/gameobjects';

describe('Enemy', () => {

    describe('constructor should', () => {

        it('not throw when valid arguments are passed', () => {
            // Arrange & Act & Assert
            expect(() => { const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []); }).not.toThrow();

        });

        it('throw when assigned value is not defined', () => {
            // Arrange & Act
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Assert
            expect(enemy.x).toBeDefined();
            expect(enemy.y).toBeDefined();
            expect(enemy.height).toBeDefined();
            expect(enemy.width).toBeDefined();
            expect(enemy.id).toBeDefined();
            expect(enemy.path).toBeDefined();
        });

        it('throw when assigned undefined value do not return Error message', () => {
            // Arrange
            const a: any = undefined;
            const b: any = undefined;
            const c: any = undefined;
            const d: any = undefined;
            const e: any = undefined;
            const f: any = undefined;

            // Act & Assert
            expect(() => (new Enemy(a, 2, 3, 4, 5, []))).toThrow(`missing argument "x"`);
            expect(() => (new Enemy(1, b, 3, 4, 5, []))).toThrow(`missing argument "y"`);
            expect(() => (new Enemy(1, 2, c, 4, 5, []))).toThrow(`missing argument "width"`);
            expect(() => (new Enemy(1, 2, 3, d, 5, []))).toThrow(`missing argument "height"`);
            expect(() => (new Enemy(1, 2, 3, 4, e, []))).toThrow(`missing argument "id"`);
            expect(() => (new Enemy(1, 2, 3, 4, 5, f))).toThrow(`No path defined`);
        });

        it('throw when argument value is not a number', () => {
            // Arrange & Act
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Assert
            expect(typeof enemy.x).toBe('number');
            expect(typeof enemy.y).toBe('number');
            expect(typeof enemy.height).toBe('number');
            expect(typeof enemy.width).toBe('number');
            expect(typeof enemy.id).toBe('number');
        });

        it('throw when argument value of path is not []', () => {
            // Arrange & Act
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Assert
            expect(enemy.path).toBeInstanceOf(Array);
        });

        it('throw when arguments of path are not assigned', () => {
            // Arrange
            const path: IPoint[] = [{x: 1, y: 2}];

            // Act
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, path);

            // Assert
            expect(enemy.path).toEqual(path);
        });

        it('correctly assigned passed values', () => {
            // Arrange & Act
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Assert
            expect(enemy.x).toBe(1);
            expect(enemy.y).toBe(2);
            expect(enemy.width).toBe(3);
            expect(enemy.height).toBe(4);
            expect(enemy.id).toBe(5);
            expect(enemy.path.length).toEqual(0);
        });
    });

    describe('direction should', () => {

        it('not throw when valid arguments are passed', () => {
            // Arrange
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Act & Assert
            expect(() => { enemy.direction = PathDirection.Backward; }).not.toThrow();
        });

        it('correctly assigned passed values', () => {
            // Arrange
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Act & Assert
            expect(enemy.direction = PathDirection.Forward).toEqual(PathDirection.Forward);
        });
    });

    describe('pathPosition should', () => {

        it('not throw when valid arguments are passed', () => {
            // Arrange
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Act & Assert
            expect(() => { enemy.pathPosition = 1; }).not.toThrow();
        });

        it('correctly assigned passed values', () => {
            // Arrange
            const enemy: Enemy = new Enemy(1, 2, 3, 4, 5, []);

            // Act & Assert
            expect(enemy.pathPosition = 3).toEqual(3);
        });
    });
});
