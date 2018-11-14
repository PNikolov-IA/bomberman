import phaser from 'phaser';
import { GameScene } from '../scenes/scene';

export class Game {
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
      scene: [GameScene]
    };

    this.instance = new phaser.Game(this.config);
  }

}
