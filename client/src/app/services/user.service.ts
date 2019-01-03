import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {JwtHelperService} from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private loginService: LoginService) { }

    // Get the status if connected or not
    getConnectStatus() {
        return !helper.isTokenExpired(this.loginService.getToken());
    }

}
