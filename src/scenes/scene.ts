import { inject } from 'inversify';
import phaser, { Input, Time } from 'phaser';
import { IntentType } from '../common/intenttype';
import { CommandsController } from '../controllers';
import { container } from '../setup/ioc.config';
import { TYPES } from '../setup/types';
import { GameObjectHolderController } from './../controllers/game-object-holder';

const GAMEPAD_TRESHOLD: number = 0.5;

export class GameScene extends phaser.Scene {
  private static game: phaser.Game;
  private map: phaser.Tilemaps.Tilemap;
  private playerWithAnimation: phaser.GameObjects.Sprite;
  private commandscontroller: CommandsController;

  private bomb: phaser.GameObjects.Sprite;
  private objectcontroller: GameObjectHolderController;
  private gamepad: Gamepad;

  public constructor() {
    super({ key: 'Map' });
    this.commandscontroller = container.get(TYPES.commandscontroller);
    this.objectcontroller = container.get(TYPES.gameobjectholdercontroller);
  }

  public preload(): void {
    this.load.tilemapTiledJSON('tilemap', '../assets/Woods.json');
    this.load.image('tiles', '../assets/overworld_tileset_grass.png');
    this.load.image('Destructable', '../assets/brick2.png');
    this.load.image('Indestructable', '../assets/stone2.png');
    this.load.spritesheet('man', '../assets/walking_man.png', { frameWidth: 16, frameHeight: 28 });
    this.load.spritesheet('bomb', '../assets/bomb.png', { frameWidth: 22, frameHeight: 23 });
  }

  public create(): void {
    this.map = this.add.tilemap('tilemap');

    const grass: phaser.Tilemaps.Tileset = this.map.addTilesetImage('overworld_tileset_grass', 'tiles');
    const backgroundLayer: phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer('Base', grass, 0, 0);

    backgroundLayer.setDisplaySize(900, 600);
    backgroundLayer.setPosition(0, 0);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('man', { start: 4, end: 7 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'bombstill',
      frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });

    // tslint:disable-next-line
    window.addEventListener('gamepadconnected', (e: Event | GamepadEvent) => {
      if (e instanceof GamepadEvent) {
        this.gamepad = e.gamepad;
      }
      console.log(this.gamepad);
    });

  }
  public update(): void {
    // Update game objects
    this.objectcontroller.render(this);

    const intentions: IntentType[] = [];

    // Reverse direction: this.playerWithAnimation.setFlipX(true);

    // Gamepad listeners
    if (this.gamepad) {
      if (this.gamepad.axes[0] > GAMEPAD_TRESHOLD) {
        intentions.push(IntentType.Right);
      }
      if (this.gamepad.axes[1] > GAMEPAD_TRESHOLD) {
        intentions.push(IntentType.Down);
      }
      if (this.gamepad.axes[0] < -GAMEPAD_TRESHOLD) {
        intentions.push(IntentType.Left);
      }
      if (this.gamepad.axes[1] < -GAMEPAD_TRESHOLD) {
        intentions.push(IntentType.Up);
      }
      if (this.gamepad.buttons[0].pressed) {
        intentions.push(IntentType.Skill1);
      }
    }

    // Keyboard listeners
    if (this.input.keyboard.addKey('A').isDown) {
      if (intentions.indexOf(IntentType.Left) < 0) {
        intentions.push(IntentType.Left);
      }
    } else if (this.input.keyboard.addKey('D').isDown) {
      if (intentions.indexOf(IntentType.Right) < 0) {
        intentions.push(IntentType.Right);
      }
    }
    if (this.input.keyboard.addKey('W').isDown) {
      if (intentions.indexOf(IntentType.Up) < 0) {
        intentions.push(IntentType.Up);
      }
    } else if (this.input.keyboard.addKey('S').isDown) {
      if (intentions.indexOf(IntentType.Down) < 0) {
        intentions.push(IntentType.Down);
      }
    }

    if (this.input.keyboard.addKey('SPACE').isDown) {
      if (intentions.indexOf(IntentType.Skill1) < 0) {
        intentions.push(IntentType.Skill1);
      }
    }

    this.commandscontroller.update(intentions);

  }
}
