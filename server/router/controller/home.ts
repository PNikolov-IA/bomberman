import { controller, httpGet } from 'inversify-express-utils';

@controller('/ver')
export class VersionController {
  // tslint:disable-next-line:no-reserved-keywords
  @httpGet('/')
  public get(): string {
    return 'Version 0.1.0';
  }
}
