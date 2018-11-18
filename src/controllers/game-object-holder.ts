import { injectable } from 'inversify';
import phaser from 'phaser';
import { GameObjectType } from '../common/gameobjecttype';

@injectable()
export class GameObjectHolderController {
  private id: number = -1;
  // tslint:disable-next-line:no-any
  private received: any[] = [];

  // tslint:disable-next-line:no-any
  private hold: any[] = [];

  public constructor() {
    // Nothing to do here
  }

  // tslint:disable-next-line:no-any
  public update(data: any, id: number): void {
    this.id = id;
    if (data) {
      this.received = data;
    }

  }

  public render(scene: phaser.Scene): void {
    // Render cycle
    let updated: number = 0;
    let created: number = 0;

    // Create new game objects
    // tslint:disable-next-line:no-any
    const receivedArray: number[] = this.received.map((el: any) => el.id);
    // tslint:disable-next-line:no-any
    const holdArray: number[] = this.hold.map((el: any) => el.id);
    // tslint:disable-next-line:no-any
    this.received.forEach((element: any) => {

      if (!holdArray.includes(element.id)) {
        if (GameObjectType[element.objecttype] === 'Destructable') {
          const destructable: phaser.GameObjects.Sprite = scene.add.sprite(
            element.x,
            element.y,
            `Destructable`
          ).setDisplaySize(30, 30);

          this.hold.push({ id: element.id, sprite: destructable });
          created += 1;
        }
        if (GameObjectType[element.objecttype] === 'Indestructable') {
          const indestructable: phaser.GameObjects.Sprite = scene.add.sprite(
            element.x,
            element.y,
            `Indestructable`
          ).setDisplaySize(30, 30);

          this.hold.push({ id: element.id, sprite: indestructable });
          created += 1;
        }

        if (GameObjectType[element.objecttype] === 'Player') {
          const player: phaser.GameObjects.Sprite = scene.add.sprite(
            element.x,
            element.y,
            `man`
          );

          player.anims.play('right', true);

          this.hold.push({ id: element.id, sprite: player });
          created += 1;
        }

      } else {
        const index: number = holdArray.indexOf(element.id);
        this.hold[index].sprite.x = element.x;
        this.hold[index].sprite.y = element.y;
        updated += 1;
      }
    });

    // tslint:disable-next-line:no-any
    this.hold = this.hold.filter((element: any) => receivedArray.includes(element.id));

  }
}
