import { Injectable } from '@angular/core';
import {ExpressService} from "./express.service";
import {Auth} from "../guards/auth";
import {UserService} from "./user.service";
import swal from "sweetalert2";
import {WebsocketService} from "./websocket.Service";

@Injectable({
  providedIn: 'root'
})
export class BadgerService {

  constructor(private expressService: ExpressService,
              private userService: UserService,
              private wsService: WebsocketService)
  {


  }

  // update the presence to users table. 0 = 'absent', 1 = 'présent' and add a point to badger table.
  setPresence (presence, callback) {
    this.userService.getIdUser((res) => {
      let content = {
        action: 'setPresence',
        id_user: res,
        presence: presence
      };
      this.expressService.postExpress('badger', content).subscribe((res:Auth) => {
        if(!res.success) {
          swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
        } else {
          this.wsService.sendSocket(); // send a signal on socket.io
          return callback(res);
        }
      });
    });
  }


}
