import { Injectable } from '@angular/core';
import {ExpressService} from "./express.service";
import {Auth} from "../guards/auth";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthTokenService} from "./auth-token.service";
import {dump} from "pm2";


@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private authTokenService: AuthTokenService,
                private router: Router,
                private expressService: ExpressService) { }


    /**
     * get only the id of user
     * @param callback
     * @param userName
     */
    getIdUser(callback, userName?) {
        if (userName === undefined) {
            const token = this.authTokenService.decodeToken();
            return callback(token.id_user);
        } else {
            const content = {
                action: 'getIdUser',
                userName: userName
            };
            this.expressService.postExpress('user', content).subscribe((res: Auth)=> {
                if (!res.success) {
                    swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                } else {
                    return callback(res.user);
                }
            });
        }
    }

    /**
     * get all data of user conected
     * @param callback
     * @param id_user
     */
    getDataUser(callback, id_user?) {
        this.expressService.checkTokenBack((isOk) => {
            if(isOk) {

                const token = this.authTokenService.decodeToken();
                // console.log(token);

                if (token === null) {
                    return callback(false);
                } else {

                    if (id_user === undefined) {
                        id_user = token.id_user;
                    }

                    const content = {
                        action: 'getDataUser',
                        id_user: id_user
                    };
                    this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                        if (!res.success) {
                            swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                        } else {
                            return callback(res.user);
                        }
                    });
                }
            }
        });
    }

    /**
     * get all data of user conected
     * @param callback
     * @param id_user
     */
    getPieChart(callback, id_user?) {
        this.expressService.checkTokenBack((isOk) => {
            if(isOk) {

                const token = this.authTokenService.decodeToken();
                // console.log(token);

                if (token === null) {
                    return callback(false);
                } else {

                    if (id_user === undefined) {
                        id_user = token.id_user;
                    }

                    const content = {
                        action: 'getPieChart',
                        id_user: id_user
                    };
                    this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                        if (!res.success) {
                            swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                        } else {
                            return callback(res.pieData, res.pieReason);
                        }
                    });
                }
            }
        });
    }

    /**
     * check if the user connected is administrator
     * @param callback
     */
    isUserAdmin(callback) {
        this.getDataUser((user) => {
            // activate administrator access if role = 3
            if (user.id_role === 3){
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }


}
