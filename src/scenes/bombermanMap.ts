import phaser, { Input, Time } from 'phaser';

export class BombermanMap extends phaser.Scene {
  public static game: phaser.Game;
  public map: phaser.Tilemaps.Tilemap;
  public playerWithAnimation: phaser.GameObjects.Sprite;

  public bomb: phaser.GameObjects.Sprite;

  public constructor() {
    super({ key: 'Map' });
  }

  public preload(): void {
    this.load.tilemapTiledJSON('tilemap', '../assets/BombermanTileset.json');
    this.load.image('tiles', '../assets/overworld_tileset_grass.png');
    this.load.image('boxes', '../assets/0x72_16x16DungeonTileset.v1.png');
    this.load.image('food', '../assets/Food.png');
    this.load.spritesheet('man', '../assets/walking_man.png', { frameWidth: 16, frameHeight: 28 });
    this.load.spritesheet('bomb', '../assets/bomb.png', { frameWidth: 22, frameHeight: 23 });
  }
  public create(): void {
    this.map = this.add.tilemap('tilemap');

    const grass: phaser.Tilemaps.Tileset = this.map.addTilesetImage('overworld_tileset_grass', 'tiles');
    const backgroundLayer: phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer('Background', grass, 0, 0);

    backgroundLayer.setDisplaySize(600, 600);
    // B backgroundLayer.setPosition(screen.height / 2 - backgroundLayer.width / 2 , screen.height / 2  - backgroundLayer.height / 2);

    const boxes: phaser.Tilemaps.Tileset = this.map.addTilesetImage('0x72_16x16DungeonTileset.v1', 'boxes');
    const food: phaser.Tilemaps.Tileset = this.map.addTilesetImage('Food', 'food');

    const iteractableLayer: phaser.Tilemaps.DynamicTilemapLayer = this.map.createDynamicLayer('Interactable', [boxes, food], 0, 0);
    iteractableLayer.setDisplaySize(600, 600);

    this.playerWithAnimation = this.add.sprite(64, 64, 'man');
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

    this.playerWithAnimation.anims.play('right', true);

    if (this.input.keyboard.addKey('A').isDown) {
      this.playerWithAnimation.setFlipX(true);
      this.playerWithAnimation.x -= 4;
    } else if (this.input.keyboard.addKey('D').isDown) {
      this.playerWithAnimation.setFlipX(false);
      this.playerWithAnimation.x += 4;
    }
    if (this.input.keyboard.addKey('W').isDown) {
      this.playerWithAnimation.y -= 4;
    } else if (this.input.keyboard.addKey('S').isDown) {
      this.playerWithAnimation.y += 4;
    }

    if (this.input.keyboard.addKey('SPACE').isDown) {
      this.bomb = this.add.sprite(this.playerWithAnimation.x, this.playerWithAnimation.y, 'bomb');
      this.bomb.anims.play('bombstill', true);

      /* Unfinished
      this.time.addEvent({
        delay: 200,
        callback: destroySprite(),
        callbackScope: this
      });
    }

    function destroySprite(): void {
      this.bomb.destroy();
      */
    }
    // B  this.bomb.destroy();

  }
}