import { inject, injectable } from 'inversify';

import * as io from 'socket.io-client';
import { Notifier } from '.';
import { IIntance } from '../contracts';
import { InstanceListController, MenuController } from '../controllers';
import { TYPES } from '../setup/types';

const ADDRESS: string = `localhost:5000`;

@injectable()
export class EventWrapper {
  private socket: SocketIOClient.Socket;
  private _connected: boolean = false;
  private readonly notifier: Notifier;
  private readonly menucontroller: MenuController;
  private readonly instancelistcontroller: InstanceListController;

  public constructor(
    @inject(TYPES.notifier) notifier: Notifier,
    @inject(TYPES.menucontroller) menucontroller: MenuController,
    @inject(TYPES.instancelistcontroller) instancelistcontroller: InstanceListController
  ) {
    this.notifier = notifier;
    this.menucontroller = menucontroller;
    this.instancelistcontroller = instancelistcontroller;
    this.socket = io.connect(ADDRESS);
    this.hook();
  }

  public get connected(): boolean {
    return this._connected;
  }

  private hook(): void {
    // The client has connected to the server
    this.socket.on('connect', () => {
      this._connected = true;
      this.notifier.notify('Connected to the server.');
    });

    // The client has been disconneced from the server
    this.socket.on('disconnect', () => {
      this._connected = false;
      this.notifier.notify('Disconnected from the server.');
    });

    // Player has joined an instance, hide the menu
    this.socket.on('join', () => {
      this.menucontroller.hide();
      // Additional logic here
    });

    // Player has left the instance, show the menu
    this.socket.on('leave', () => {
      this.menucontroller.show();
    });

    // Receiving information about the server, update
    this.socket.on('serverdata', (msg: string) => {
      const result: { instances: IIntance[] } = JSON.parse(msg);
      this.instancelistcontroller.update(result.instances);
    });
  }
}
