import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService,
              private userService: UserService
  ) { }

  ngOnInit() {
    this.getConnectState();
  }

  getConnectState() {
    return this.loginService.getConnectState();
  }

  onConnect() {
    this.loginService.setConnectState();
  }

}
