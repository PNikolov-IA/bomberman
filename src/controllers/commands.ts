import { injectable } from 'inversify';
import { IntentType } from '../common/intenttype';

@injectable()
export class CommandsController {
  private _commands: IntentType[];

  public constructor() {
    this._commands = [];
  }

  public update(commands: IntentType[]): void {
    if (commands.length) {
      this._commands = commands;
    } else {
      this._commands = [];
    }
  }

  public get commands(): IntentType[] {
    return this._commands.slice();
  }
}
