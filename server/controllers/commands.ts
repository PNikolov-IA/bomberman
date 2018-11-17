import { injectable } from 'inversify';
import { IIntentWrap } from '../common';
import { ICommandsController } from '../common/commands';

@injectable()
export class CommandsController implements ICommandsController {
  private _commands: IIntentWrap[];

  public constructor() {
    this._commands = [];
  }

  public get commands(): IIntentWrap[] {
    return this._commands;
  }

  public update(command: IIntentWrap): void {
    const ids: number[] = [];
    this._commands.map((element: IIntentWrap) => element.id);
    if (ids.indexOf(command.id) >= 0) {
      this._commands[ids.indexOf(command.id)] = command;
    } else {
      this._commands.push(command);
    }
  }

  public clear(id: number): void {
    this._commands = this._commands.filter((element: IIntentWrap) => element.id !== id);
  }
}
