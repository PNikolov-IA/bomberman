import { MapInstance } from './../../server/controllers/wrappers/map-instance';
import { MapInstanceFactory } from './../../server/models/factories/map-instance-factory';
import { IMapInstanceFactory, IGameObject } from '../../server/contracts';
import { CommandsController } from '../../server/controllers/commands';
import { ICommandsController, MapType } from '../../server/common';
import { GameObjectFactory } from '../../server/models/factories/game-object-factory';

describe('MapInstanceFactory', () => {
    describe('create method should', () => {
        beforeEach(() => {
            // Mock the MapInstanceFactory
            const mockMapInstanceFactory: jest.Mock<IMapInstanceFactory> = jest.fn<IMapInstanceFactory>()
                .mockImplementation(() => ({
                    factory: jest.fn().mockReturnValue(new GameObjectFactory()),
                    formatDate: jest.fn().mockReturnValue(new CommandsController())
                }));
        });

        it('be called once', () => {
            // Arrange
            const factory: GameObjectFactory = new GameObjectFactory();
            const formatDate: ICommandsController = new CommandsController();
            const mapInstanceFactory: IMapInstanceFactory = new MapInstanceFactory(factory, formatDate);

            const spy: jest.SpyInstance = jest.spyOn(mapInstanceFactory, 'create');

            // Act
            mapInstanceFactory.create(MapType.Woods);

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });

        it('return instance of MapInstance ', () => {
            // Arrange
            const factory: GameObjectFactory = new GameObjectFactory();
            const formatDate: ICommandsController = new CommandsController();
            const mapInstanceFactory: IMapInstanceFactory = new MapInstanceFactory(factory, formatDate);

            const spy: jest.SpyInstance = jest.spyOn(mapInstanceFactory, 'create');

            // Act
            mapInstanceFactory.create(MapType.Woods);

            // Assert
            expect(spy).toHaveReturned();
            spy.mockRestore();
        });
    });
});
