// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Bomb, Boundary, Enemy, Indestructable, Player } from '../../server/models/gameobjects';
import { IGameObjectFactory } from './../../server/contracts/factory/gameobjectfactory';
import { IGameObject } from './../../server/contracts/gameobject';
import { GameObjectFactory } from './../../server/models/factories/game-object-factory';
import { Destructable } from './../../server/models/gameobjects/destructable';

describe('GameObjectFactory', () => {
    describe('createBomb should', () => {

        it('be instance of class Bomb', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const bomb: Bomb = new Bomb(5, 6, 32, 32, 205);

            // Act
            const result: IGameObject = factory.createBomb(5, 6);

            // Assert

            expect(result).toBeInstanceOf(Bomb);
        });

        it('return correct Bomb object with correctly assigned parameters', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const bomb: Bomb = new Bomb(5, 6, 30, 30, 205);

            // Act
            const result: IGameObject =  factory.createBomb(5, 6);
            bomb.updatePos(5, 6);

            // Assert
            expect(bomb.x).toBe(result.x);
            expect(bomb.y).toBe(result.y);
        });
    });
    describe('createBoundary should', () => {

        it('be instance of class Boundary', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const boundary: Boundary = new Boundary(5, 6, 32, 32, 205);

            // Act
            const result: IGameObject = factory.createBoundary(5, 6);

            // Assert

            expect(result).toBeInstanceOf(Boundary);
        });

        it('return correct Boundary object with correctly assigned parameters', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const boundary: Boundary = new Boundary(5, 6, 30, 30, 205);

            // Act
            const result: IGameObject =  factory.createBomb(5, 6);
            boundary.updatePos(5, 6);

            // Assert
            expect(boundary.x).toBe(result.x);
            expect(boundary.y).toBe(result.y);
        });
    });
    describe('createDestructable should', () => {

        it('be instance of class Destructable', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const destructable: Destructable = new Destructable(5, 6, 30, 30, 206);

            // Act,206
            const result: IGameObject = factory.createDestructable(5, 6);

            // Assert

            expect(result).toBeInstanceOf(Destructable);
        });

        it('return correct Destructable object with correctly assigned parameters', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const destructable: Destructable = new Destructable(5, 6, 30, 30, 206);

            // Act
            const result: IGameObject = factory.createDestructable(5, 6);
            destructable.updatePos(5, 6);

            // Assert
            expect(destructable.x).toBe(result.x);
            expect(destructable.y).toBe(result.y);
        });
    });
    describe('createEnemy should', () => {

        it('be instance of class Enemy', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const enemy: Enemy = new Enemy(5, 6, 30, 30, 206, [{x: 5, y: 6}]);

            // Act,206
            const result: IGameObject = factory.createEnemy(5, 6, [{x: 5, y: 6}]);

            // Assert

            expect(result).toBeInstanceOf(Enemy);
        });

        it('return correct Enemy object with correctly assigned parameters', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const enemy: Destructable = new Enemy(5, 6, 30, 30, 206, [{x: 5, y: 6}]);

            // Act
            const result: IGameObject = factory.createEnemy(5, 6, [{x: 5, y: 6}]);
            enemy.updatePos(5, 6);

            // Assert
            expect(enemy.x).toBe(result.x);
            expect(enemy.y).toBe(result.y);
        });
    });
    describe('createIndestructable should', () => {

        it('be instance of class Indestructable', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const indestructable: Indestructable = new Indestructable(5, 6, 30, 30, 206);

            // Act,206
            const result: IGameObject = factory.createIndestructable(5, 6);

            // Assert

            expect(result).toBeInstanceOf(Indestructable);
        });

        it('return correct Indestructable object with correctly assigned parameters', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const indestructable: Indestructable = new Indestructable(5, 6, 30, 30, 206);

            // Act
            const result: IGameObject = factory.createIndestructable(5, 6);
            indestructable.updatePos(5, 6);

            // Assert
            expect(indestructable.x).toBe(result.x);
            expect(indestructable.y).toBe(result.y);
        });
    });
    describe('createPlayer should', () => {

        it('be instance of class Player', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const player: Player = new Player(5, 6, 30, 30, 206);

            // Act,206
            const result: IGameObject = factory.createPlayer(5, 6);

            // Assert

            expect(result).toBeInstanceOf(Player);
        });

        it('return correct Player object with correctly assigned parameters', () => {
            // Arrange
            const factory: IGameObjectFactory = new GameObjectFactory();
            const player: Player = new Player(5, 6, 30, 30, 206);

            // Act
            const result: IGameObject = factory.createPlayer(5, 6);
            player.updatePos(5, 6);

            // Assert
            expect(player.x).toBe(result.x);
            expect(player.y).toBe(result.y);
        });
    });
});
