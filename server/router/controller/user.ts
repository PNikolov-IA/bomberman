import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut
} from 'inversify-express-utils';
import { IUser, UserService } from '../service/user';

import { Request } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../constant/types';

@controller('/user')
export class UserController {

  private _userService: UserService;

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this._userService = userService;
  }

  @httpGet('/')
  public getUsers(): IUser[] {
    return this._userService.getUsers();
  }

  @httpGet('/:id')
  public getUser(request: Request): IUser {
    return this._userService.getUser(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request): IUser {
    return this._userService.newUser(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): IUser {
    return this._userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this._userService.deleteUser(request.params.id);
  }
}
