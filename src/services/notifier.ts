import {injectable} from 'inversify';
import * as M from 'materialize-css';

@injectable()
export class Notifier {

  public constructor() {
    // Nothing to do here
  }

  public notify(message: string): void {
    M.toast({html: message});
  }

}
