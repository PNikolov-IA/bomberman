import { inject, injectable } from 'inversify';
import { GameObjectHolderController } from './../controllers/game-object-holder';

import * as io from 'socket.io-client';
import { Notifier } from '.';
import { IIntance } from '../contracts';
import { CreateGameController, InstanceListController, MenuController } from '../controllers';
import { Game } from '../game/game';
import { TYPES } from '../setup/types';

const ADDRESS: string = `localhost:5000`;

@injectable()
export class EventWrapper {
  private socket: SocketIOClient.Socket;
  private _connected: boolean = false;
  private readonly creategamecontroller: CreateGameController;
  private readonly notifier: Notifier;
  private readonly menucontroller: MenuController;
  private readonly instancelistcontroller: InstanceListController;
  private readonly gameobjectcontroller: GameObjectHolderController;

  private game: Game | null;

  public constructor(
    @inject(TYPES.notifier) notifier: Notifier,
    @inject(TYPES.creategamecontroller) creategamecontroller: CreateGameController,
    @inject(TYPES.menucontroller) menucontroller: MenuController,
    @inject(TYPES.instancelistcontroller) instancelistcontroller: InstanceListController,
    @inject(TYPES.gameobjectholdercontroller) gameobjectcontroller: GameObjectHolderController
  ) {
    this.notifier = notifier;
    this.creategamecontroller = creategamecontroller;
    this.menucontroller = menucontroller;
    this.instancelistcontroller = instancelistcontroller;
    this.gameobjectcontroller = gameobjectcontroller;

    this.socket = io.connect(ADDRESS);
    this.hook();
  }

  public get connected(): boolean {
    return this._connected;
  }

  private hook(): void {

    // Hook contollers
    this.creategamecontroller.onCreate(() => {
      if (this._connected) {
        this.socket.emit('create', '1');
      }
    });

    // The client has connected to the server
    this.socket.on('connect', () => {
      this._connected = true;
      this.notifier.notify('Connected to the server.');
    });

    // On notification message
    this.socket.on('message', (msg: string) => {
      this.notifier.notify(msg);
    });

    // Player has joined an instance, hide the menu
    this.socket.on('join', () => {
      this.menucontroller.hide();
      // Additional logic here
      this.game = new Game();
    });

    // Receiving information about the server, update
    this.socket.on('serverdata', (msg: string) => {
      const result: { instances: IIntance[] } = JSON.parse(msg);
      this.instancelistcontroller.update(result.instances);
    });

    // Receiving game object data upate from the surver
    this.socket.on('update', (msg: string) => {
      // tslint:disable-next-line:no-any
      const data: any = JSON.parse(msg);
      this.gameobjectcontroller.update(data.gamedata, data.ownID);
    });

    // Player has left the instance, show the menu
    this.socket.on('leave', () => {
      this.menucontroller.show();
      this.game = null;
    });

    // The client has been disconneced from the server
    this.socket.on('disconnect', () => {
      this._connected = false;
      this.notifier.notify('Disconnected from the server.');
    });
  }
}
