import { Injectable } from '@angular/core';
import {ExpressService} from "./express.service";
import {Auth} from "../guards/auth";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BadgerService {

  constructor(private expressService: ExpressService,
              private userService: UserService) { }

  // update the presence to users table. 0 = 'absent', 1 = 'présent' and add a point to badger table.
  setPresence (presence, callback) {
    let content = {
      action: 'setPresence',
      id_user: this.userService.getIdUser(),
      presence: presence
    };
    this.expressService.postExpress('badger', content).subscribe((res:Auth) => {
      return callback(res);
    });
  }


}
