import phaser from 'phaser';

export class BombermanMap extends phaser.Scene {
  public static game: phaser.Game;
  public map: phaser.Tilemaps.Tilemap;
    public constructor() {
        super({ key: 'Map' });
      }

      public preload(): void {
        //
        this.load.tilemapTiledJSON('tilemap', '../assets/BombermanTileset.json');
        this.load.image('tiles', '../assets/overworld_tileset_grass.png');
        this.load.image('boxes', '../assets/0x72_16x16DungeonTileset.v1.png');
        this.load.image('food', '../assets/Food.png');

      }
      public create(): void {
        this.map = this.add.tilemap('tilemap');

        this.map.addTilesetImage('overworld_tileset_grass', 'tiles');
        this.map.createStaticLayer('Background', this.map.addTilesetImage('overworld_tileset_grass', 'tiles'), 0 , 0);

        const boxes: phaser.Tilemaps.Tileset = this.map.addTilesetImage('0x72_16x16DungeonTileset.v1', 'boxes');
        const food: phaser.Tilemaps.Tileset = this.map.addTilesetImage('Food', 'food');

        this.map.createDynamicLayer('Interactable', [boxes, food] , 0 , 0);

      }
}
