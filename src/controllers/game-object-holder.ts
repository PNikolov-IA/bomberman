import { injectable } from 'inversify';
import phaser from 'phaser';
import { GameObjectType } from './../../server/common/gameobjecttype';

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
    //console.log(data);
  }

  public render(scene: phaser.Scene): void {
    // Render cycle

    // Create new game objects
    // tslint:disable-next-line:no-any
    const receivedArray: number[] = this.hold.map((el: any) => el.id);
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
          );
          //destructable.setDisplaySize(32, 32);
          this.hold.push({ id: element.id, sprite: destructable });
        }
        if (GameObjectType[element.objecttype] === 'Indestructable') {
          const indestructable: phaser.GameObjects.Sprite = scene.add.sprite(
            element.x,
            element.y,
            `Indestructable`
          );
          //indestructable.setDisplaySize(32, 32);
          this.hold.push({ id: element.id, sprite: indestructable });
        }

      } else {
        const index: number = holdArray.indexOf(element.id);
        this.hold[index].x = element.x;
        this.hold[index].y = element.y;
      }
    });

    // tslint:disable-next-line:no-any
    this.hold = this.hold.filter((element: any) => receivedArray.includes(element.id));

  }
}
