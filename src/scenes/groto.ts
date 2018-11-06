import phaser from 'phaser';
export class Groto extends phaser.Scene {

  private logo: phaser.GameObjects.Image;

  public constructor() {
    super({ key: 'Groto' });
  }

  public preload(): void {
    //
    this.load.image('logo', '../assets/logo.png');
  }

  public create(): void {
    // Nothing
    this.logo = this.add.image(200, 200, 'logo');
    this.logo.x = this.logo.width / 2;
    this.logo.y = this.logo.height / 2;
  }

  public render(): void {
    // Nothing
  }
}
