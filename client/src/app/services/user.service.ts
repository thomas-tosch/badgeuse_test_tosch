import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ExpressService} from "./express.service";
import {Auth} from "../guards/auth";
import {validate} from "email-validator";

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
    getIdUser() {
        let token = helper.decodeToken(this.loginService.getToken());
        return token.id_user;
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

    // Control if the e-mail content is on a valid format
    static mailValidate(mailContent) {
        return validate(mailContent);
    }

    // Control if the password content is on a valid format
    static validPass(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{5,255}$/;
        return !(regex.test(password));
    }

    // Compare two password
    static comparePass(newPass, confPass) {
        return !(newPass === confPass);
    }

}
