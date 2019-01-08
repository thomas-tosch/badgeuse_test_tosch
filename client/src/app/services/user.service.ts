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

    token;

    constructor(private loginService: LoginService,
                private expressService: ExpressService) { }

    // Get the status if connected or not
    getConnectStatus() {
        return !helper.isTokenExpired(this.loginService.getToken());
    }

    // get all data of user conected
    getDataUser(callback) {
        let token = helper.decodeToken(this.loginService.getToken());
        let content = {
            action: 'getDataUser',
            id_user: token.id_user
        };
        this.expressService.postExpress('user', content).subscribe((res: Auth)=> {
            return callback(res.user);
        });
    }

}
