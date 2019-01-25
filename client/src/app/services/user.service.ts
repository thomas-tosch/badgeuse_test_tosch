import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ExpressService} from "./express.service";
import {Auth} from "../guards/auth";

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private loginService: LoginService,
                private expressService: ExpressService) { }

    // Get the status if connected or not
    getConnectStatus() {
        return !helper.isTokenExpired(this.loginService.getToken());
    }

    // get only the id of user
    getIdUser(callback, userName?) {
        if(userName === undefined){
            let token = helper.decodeToken(this.loginService.getToken());
            return callback(token.id_user);
        } else {
            let content = {
                action: 'getIdUser',
                userName: userName
            };
            this.expressService.postExpress('user', content).subscribe((res: Auth)=> {
                return callback(res.user);
            });
        }
    }

    // get all data of user conected
    getDataUser(callback, id_user?) {
        let token = helper.decodeToken(this.loginService.getToken());

        if(id_user === undefined){id_user = token.id_user;}

        let content = {
            action: 'getDataUser',
            id_user: id_user
        };
        this.expressService.postExpress('user', content).subscribe((res: Auth)=> {
            return callback(res.user);
        });
    }

    isUserAdmin(callback) {
        this.getDataUser((user)=>{
            // activate administrator access if role = 3
            if(user.id_role === 3){
                return callback(true);
            } else {
                return callback(false);
            }
        })
    }


}
