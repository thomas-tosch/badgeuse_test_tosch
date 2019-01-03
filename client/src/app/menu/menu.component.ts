import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userState = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  // for test, set the user state. true = 'présent', false = 'absent'
  onBadge() {
    this.userState = !this.userState;
  }

  // logOut the user
  onDisconnect() {
    this.loginService.logout();
  }

}
