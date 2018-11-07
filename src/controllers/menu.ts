import {injectable} from 'inversify';
import jquery from 'jquery';

@injectable()
export class MenuController {
  private readonly element: JQuery;

  public constructor() {
    this.element = jquery('#server-data');
  }

  public show(): void {
    this.element.show();
  }

  public hide(): void {
    this.element.hide();
  }
}
