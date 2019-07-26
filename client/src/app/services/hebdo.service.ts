import { Injectable } from '@angular/core';
import {ExpressService} from "./express.service";
import {WebsocketService} from "./websocket.Service";
import {Auth} from "../guards/auth";
import swal from 'sweetalert2';
import {AuthTokenService} from "./auth-token.service";

@Injectable({
  providedIn: 'root'
})
export class HebdoService {

  constructor(private expressService: ExpressService,
              private authTokenService: AuthTokenService) { }


  /**
   * get the list of users according to filtering data
   */
  getUserListHebdo(callback, startDate, endDate, filterGroup, orderby) {
    this.expressService.checkTokenBack((isOk) => {
      if(isOk) {

        const token = this.authTokenService.decodeToken();

        if (token === null) {
          return callback(false);
        } else {

          const content = {
            action: 'getUserListHebdo',
            startDate: startDate,
            endDate: endDate,
            filterGroup: filterGroup,
            orderBy: orderby
          };
          this.expressService.postExpress('hebdo', content).subscribe((res: Auth) => {
            if (!res.success) {
              swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
              return callback('error in the reading of hebdoService.getUserListHebdo data', []);
            } else {
              return callback(null, res.list);
            }

          });
        }
      }
    });
  }










}
