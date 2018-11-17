// tslint:disable-next-line:no-import-side-effect
import 'jest';
import { GameObject } from '../../server/models/gameobjects/gameobject';

describe('GameObject', () => {

  describe('constructor should', () => {

    it('not throw when valid arguments are passed', () => {

      expect(() => {const gameobj: GameObject = new GameObject(1, 2, 3, 4, 5); }).not.toThrow();

    });

  });

});
