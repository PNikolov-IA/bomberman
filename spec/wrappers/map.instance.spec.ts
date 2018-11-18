// tslint:disable-next-line:no-import-side-effect
import 'jest';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { GameObjectType, ICommandsController, IUser, MapType } from '../../server/common';
import { IGameObject, IGameObjectFactory, IMapInstance, IPlayer } from '../../server/contracts';
import { CommandsController } from '../../server/controllers/commands';
import { GameObjectFactory } from '../../server/models/factories/game-object-factory';
import { User } from '../../server/models/users/user';
import { MapInstance } from './../../server/controllers/wrappers/map-instance';
import { Player } from './../../server/models/gameobjects/player';

describe('MapInstance', () => {

  describe('constructor/load should', () => {

    let gameObjectFactory: IGameObjectFactory;
    let commandsController: ICommandsController;

    beforeEach(() => {
      // Arrange
      gameObjectFactory = new GameObjectFactory();
      commandsController = new CommandsController();
    });

    it('not throw when valid arguments are passed', () => {

      // Act & Assert
      expect(() => {
        const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      }).not.toThrow();

    });

    it('have called createBoundary the correct number of times', () => {

      // Act
      jest.spyOn(gameObjectFactory, 'createBoundary');
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);

      // Assert
      expect(gameObjectFactory.createBoundary).toHaveBeenCalledTimes(3);

    });

    it('have called createDestructable the correct number of times', () => {

      // Act
      jest.spyOn(gameObjectFactory, 'createDestructable');
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);

      // Assert
      expect(gameObjectFactory.createDestructable).toHaveBeenCalledTimes(1);

    });

    it('have called createIndestructable the correct number of times', () => {

      // Act
      jest.spyOn(gameObjectFactory, 'createIndestructable');
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);

      // Assert
      expect(gameObjectFactory.createIndestructable).toHaveBeenCalledTimes(2);

    });

    it('have called createEnemy the correct number of times', () => {

      // Act
      jest.spyOn(gameObjectFactory, 'createEnemy');
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);

      // Assert
      expect(gameObjectFactory.createEnemy).toHaveBeenCalledTimes(1);

    });

  });

  describe('update/exports should', () => {

    let gameObjectFactory: IGameObjectFactory;
    let commandsController: ICommandsController;

    beforeEach(() => {
      // Arrange
      gameObjectFactory = new GameObjectFactory();
      commandsController = new CommandsController();
    });

    it('return the correct number of objects', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      mapInstance.update();
      const objects: IGameObject[] = mapInstance.exports;

      // Assert
      expect(objects.length).toEqual(4);

    });

    it('contain the correct type count of objects', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      mapInstance.update();
      const objects: IGameObject[] = mapInstance.exports;
      const enemies: number = objects.filter((gameObj: IGameObject) => gameObj.objecttype === GameObjectType.Enemy).length;
      const destructables: number = objects.filter((gameObj: IGameObject) => gameObj.objecttype === GameObjectType.Destructable).length;
      const indestructables: number = objects.filter((gameObj: IGameObject) => gameObj.objecttype === GameObjectType.Indestructable).length;
      const players: number = objects.filter((gameObj: IGameObject) => gameObj.objecttype === GameObjectType.Player).length;

      // Assert
      expect(enemies).toEqual(1);
      expect(destructables).toEqual(1);
      expect(indestructables).toEqual(2);
      expect(players).toEqual(0);

    });

  });

  describe('canJoin should', () => {

    let gameObjectFactory: IGameObjectFactory;
    let commandsController: ICommandsController;

    beforeEach(() => {
      // Arrange
      gameObjectFactory = new GameObjectFactory();
      commandsController = new CommandsController();

    });

    it('return true if the user hasn\'t joined the instance', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      const canJoin: boolean = mapInstance.canJoin(user);

      // Assert
      expect(canJoin).toEqual(true);

    });

    it('return false if the user has already joined the instance', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      mapInstance.join(user);
      const canJoin: boolean = mapInstance.canJoin(user);

      // Assert
      expect(canJoin).toEqual(false);

    });

  });

  describe('hasUser should', () => {

    let gameObjectFactory: IGameObjectFactory;
    let commandsController: ICommandsController;

    beforeEach(() => {
      // Arrange
      gameObjectFactory = new GameObjectFactory();
      commandsController = new CommandsController();

    });

    it('return true if the user is in the instance', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      mapInstance.join(user);
      const hasUser: boolean = mapInstance.hasUser(user);

      // Assert
      expect(hasUser).toEqual(true);

    });

    it('return false if the user is not in the instance', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      const hasUser: boolean = mapInstance.hasUser(user);

      // Assert
      expect(hasUser).toEqual(false);

    });

  });

  describe('join should', () => {

    let gameObjectFactory: IGameObjectFactory;
    let commandsController: ICommandsController;

    beforeEach(() => {
      // Arrange
      gameObjectFactory = new GameObjectFactory();
      commandsController = new CommandsController();

    });

    it('correctly add the user to the instance', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      mapInstance.join(user);
      const player: IPlayer = mapInstance.players[0];

      // Assert
      expect(player.instance).toEqual(mapInstance);
      expect(user.ingame).toEqual(true);
      expect(player.userID).toEqual(user.id);

    });

    it('not add the used to the instance if the user is already in', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      mapInstance.join(user);
      mapInstance.join(user);
      const player: IPlayer[] = mapInstance.players;

      // Assert
      expect(player.length).toEqual(1);

    });

  });

  describe('remove should', () => {

    let gameObjectFactory: IGameObjectFactory;
    let commandsController: ICommandsController;

    beforeEach(() => {
      // Arrange
      gameObjectFactory = new GameObjectFactory();
      commandsController = new CommandsController();

    });

    it('correctly remove the user from the instance', () => {

      // Act
      const mapInstance: IMapInstance = new MapInstance(MapType.Space, gameObjectFactory, commandsController);
      const user: IUser = new User(1);
      mapInstance.join(user);
      mapInstance.remove(user);

      // Assert
      expect(user.ingame).toEqual(false);
      expect(mapInstance.players.length).toEqual(0);

    });

  });

});
