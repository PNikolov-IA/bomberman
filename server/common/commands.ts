import { IIntentWrap } from '.';

export interface ICommandsController {
  commands: IIntentWrap[];
  update(commands: IIntentWrap): void;
  clear(id: number): void;
}
