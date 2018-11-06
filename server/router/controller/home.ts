import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export class HomeController {
  // tslint:disable-next-line:no-reserved-keywords
  @httpGet('/')
  public get(): string {
    return 'Home sweet home';
  }
}
