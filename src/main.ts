import phaser from 'phaser';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { container} from './setup/ioc.config';

import { BombermanMap } from './scenes/bombermanMap';
import { EventWrapper } from './services';
import { TYPES } from './setup/types';

const connection: EventWrapper = container.get(TYPES.eventwrapper);

class Game {
  private readonly config: Object;
  private readonly instance: phaser.Game;

  public constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 900,
      height: 600,
      parent: document.getElementById('game'),
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        }
      },
      scene: [BombermanMap]
    };

    this.instance = new phaser.Game(this.config);
  }

}

const game: Game = new Game();
