import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-badger',
  templateUrl: './badger.component.html',
  styleUrls: ['./badger.component.css']
})
export class BadgerComponent implements OnInit {

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

  getTemoinColor() {
    if(this.userState){
      return 'green';
    } else {
      return 'red';
    }
  }

}
