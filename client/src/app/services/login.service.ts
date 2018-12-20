import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(private userService: UserService) { }

    getConnectState() {
        return this.userService.connectState;
    }

    setConnectState() {
        this.userService.connectState = !this.userService.connectState;
    }
}