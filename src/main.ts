import phaser from 'phaser';

import { BombermanMap } from './scenes/bombermanMap';

import * as io from 'socket.io-client';

const socket: SocketIOClient.Socket = io.connect(`localhost:5000`);

socket.on('message', (msg: string | undefined) => {
  console.log(msg);
});

class Game {
  private readonly config: Object;
  private readonly instance: phaser.Game;

  public constructor() {
    this.config = {
      type: Phaser.AUTO,
      // width: window.innerWidth,
      // height: window.innerHeight,
      width: 320,
      height: 320,
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
