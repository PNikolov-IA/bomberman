import { injectable } from 'inversify';
import phaser from 'phaser';

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
    console.log(data);
  }

  public render(scene: phaser.Scene): void {
    // Render cycle

    // Create new game objects
    // tslint:disable-next-line:no-any
    this.received.forEach((element: any) => {
      // If object id is not in "hold", create a new sprite and add it to "hold"
      // Check object type
      // This: const obj: {id: number; sprite: phaser.GameObject.Sprite} = scene.add.sprite(...)
      // This: this.hold.push(obj)

      // If object is already in "hold" (objInHold.id === objInReceived.id)
      // Update objInHold.x/y
    });

    // Update in-game sprites
    this.hold.forEach((element: { id: number; sprite: phaser.GameObjects.Sprite }) => {
      // Remove objects from "hold" if their matching "id" is not in "received"
    });
  }
}
