import { inject, injectable } from 'inversify';
import jquery from 'jquery';
import { IIntance } from '../contracts';
import { TYPES } from '../setup/types';
import { InstanceTemplate } from '../templates/instance';

@injectable()
export class InstanceListController {
  private readonly element: JQuery;
  private readonly template: InstanceTemplate;

  public constructor(@inject(TYPES.instancetemplate) template: InstanceTemplate) {
    this.element = jquery('#instances');
    this.template = template;
  }

  public update(instances: IIntance[]): void {
    // Update instance list
    // Remove the content of this.element
    // And update it using the template engine injected in the controller
    // Look into the template code and find out how it works
  }
}
