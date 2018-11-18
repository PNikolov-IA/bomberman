import { inject } from 'inversify';
import phaser, { Input, Time } from 'phaser';
import { IntentType } from '../common/intenttype';
import { CommandsController } from '../controllers';
import { container } from '../setup/ioc.config';
import { TYPES } from '../setup/types';
import { GameObjectHolderController } from './../controllers/game-object-holder';

export class GameScene extends phaser.Scene {
  private static game: phaser.Game;
  private map: phaser.Tilemaps.Tilemap;
  private playerWithAnimation: phaser.GameObjects.Sprite;
  private commandscontroller: CommandsController;

  private bomb: phaser.GameObjects.Sprite;
  private objectcontroller: GameObjectHolderController;

  public constructor() {
    super({ key: 'Map' });
    this.commandscontroller = container.get(TYPES.commandscontroller);
    this.objectcontroller = container.get(TYPES.gameobjectholdercontroller);
  }

  public preload(): void {
    this.load.tilemapTiledJSON('tilemap', '../assets/Woods.json');
    this.load.image('tiles', '../assets/overworld_tileset_grass.png');
    this.load.image('Destructable', '../assets/brick.png');
    this.load.image('Indestructable', '../assets/stone.png');
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

  }
  public update(): void {
    // Update game objects
    this.objectcontroller.render(this);

    const intentions: IntentType[] = [];

    // this.playerWithAnimation.anims.play('right', true);

    if (this.input.keyboard.addKey('A').isDown) {
      intentions.push(IntentType.Left);
      // this.playerWithAnimation.setFlipX(true);
      // this.playerWithAnimation.x -= 4;
    } else if (this.input.keyboard.addKey('D').isDown) {
      intentions.push(IntentType.Right);
      // this.playerWithAnimation.setFlipX(false);
      // this.playerWithAnimation.x += 4;
    }
    if (this.input.keyboard.addKey('W').isDown) {
      intentions.push(IntentType.Up);
      // this.playerWithAnimation.y -= 4;
    } else if (this.input.keyboard.addKey('S').isDown) {
      intentions.push(IntentType.Down);
      // this.playerWithAnim ation.y += 4;
    }

    if (this.input.keyboard.addKey('SPACE').isDown) {
      intentions.push(IntentType.Skill1);
      // this.bomb = this.add.sprite(this.playerWithAnimation.x, this.playerWithAnimation.y, 'bomb');
      // this.bomb.anims.play('bombstill', true);
    }

    this.commandscontroller.update(intentions);

  }
}
