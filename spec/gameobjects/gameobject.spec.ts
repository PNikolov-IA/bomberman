// tslint:disable-next-line:no-import-side-effect
import 'jest';
import { GameObject } from '../../server/models/gameobjects/gameobject';

describe('GameObject', () => {

  describe('constructor should', () => {

    it('not throw when valid arguments are passed', () => {
      // Arrange & Act & Assert
      expect(() => { const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5); }).not.toThrow();
    });

    it('throw when assigned value is not defined', () => {
      // Arrange & Act
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Assert
      expect(gameobj.x).toBeDefined();
      expect(gameobj.y).toBeDefined();
      expect(gameobj.height).toBeDefined();
      expect(gameobj.width).toBeDefined();
      expect(gameobj.id).toBeDefined();
    });

    it('throw when assigned undefined value do not return Error message', () => {
      // Arrange
      const a: any = undefined;
      const b: any = undefined;
      const c: any = undefined;
      const d: any = undefined;
      const e: any = undefined;

      // Act & Assert
      expect(() => (new GameObject(a, 2, 3, 4, 5))).toThrow(`missing argument "x"`);
      expect(() => (new GameObject(1, b, 3, 4, 5))).toThrow(`missing argument "y"`);
      expect(() => (new GameObject(1, 2, c, 4, 5))).toThrow(`missing argument "height"`);
      expect(() => (new GameObject(1, 2, 3, d, 5))).toThrow(`missing argument "width"`);
      expect(() => (new GameObject(1, 2, 3, 4, e))).toThrow(`missing argument "id"`);
    });

    it('throw when argument value is not a number', () => {
      // Arrange & Act
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Assert
      expect(typeof gameobj.x).toBe('number');
      expect(typeof gameobj.y).toBe('number');
      expect(typeof gameobj.height).toBe('number');
      expect(typeof gameobj.width).toBe('number');
      expect(typeof gameobj.id).toBe('number');
    });

    it('correctly assigned passed values', () => {
      // Arrange & Act
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Assert
      expect(gameobj.x).toBe(1);
      expect(gameobj.y).toBe(2);
      expect(gameobj.height).toBe(3);
      expect(gameobj.width).toBe(4);
      expect(gameobj.id).toBe(5);
    });
  });

  describe('updatePos() method should', () => {

    it('not throw when valid arguments are passed', () => {
      // Arrange
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Act & Assert
      expect(() => { gameobj.updatePos(2, 3); }).not.toThrow();
    });

    it('throw when assigned value is not defined', () => {
      // Arrange
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Act
      gameobj.updatePos(2, 3);

      // Assert
      expect(gameobj.x).toBeDefined();
      expect(gameobj.y).toBeDefined();
    });

    it('throw when assigned value is not a number', () => {
      // Arrange
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Act
      gameobj.updatePos(2, 3);

      // Assert
      expect(typeof gameobj.x).toBe('number');
      expect(typeof gameobj.y).toBe('number');
    });

    it('throw when assigned undefined value do not return Error message', () => {
      // Arrange
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);
      const a: any = undefined;
      const b: any = undefined;

      // Act & Assert
      expect(() => { gameobj.updatePos(a, 3); }).toThrow(`missing argument "x"`);
      expect(() => { gameobj.updatePos(2, b); }).toThrow(`missing argument "y"`);
    });

    it('correctly assigned passed values', () => {
      // Arrange
      const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5);

      // Act
      gameobj.updatePos(2, 3);

      // Assert
      expect(gameobj.x).toBe(2);
      expect(gameobj.y).toBe(3);
    });
  });
});
