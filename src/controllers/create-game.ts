import { injectable } from 'inversify';
import jquery from 'jquery';

@injectable()
export class CreateGameController {
  private _createbutton: JQuery;
  private _handler: Function;

  public constructor() {
    this._createbutton = jquery('#create');
    this._handler = (): void => {
      // Empty placeholder
    };

    this._createbutton.on('click', () => this._handler());
  }

  public onCreate(handler: Function): void {
    this._handler = handler;
  }

}
