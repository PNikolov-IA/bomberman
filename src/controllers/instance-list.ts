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
    this.element.html(instances.reduce((acc: string, instance: IIntance) => acc + this.template.compile(instance), ''));
  }
}
