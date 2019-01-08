import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {faCheckCircle, faTimesCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-badger',
  templateUrl: './badger.component.html',
  styleUrls: ['./badger.component.css']
})
export class BadgerComponent implements OnInit {

  userState = false;
  tooltipState;
  temoinState;
  buttonActivate = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getTolltipState();
    this.getTemoinStatus();
  }

  // for test, set the user state. true = 'présent', false = 'absent'
  onBadge() {
    this.buttonActivate = true;
      this.userState = !this.userState;
      this.getTolltipState();
      this.getTemoinStatus();

      setTimeout(()=> {
        this.buttonActivate = false;
      }, 5000);
  }

  // logOut the user
  onDisconnect() {
    this.loginService.logout();
  }

  getTemoinStatus() {
    if(this.userState) {
      this.temoinState = faCheckCircle;
      return 'green';
    } else {
      this.temoinState = faTimesCircle;
      return 'red';
    }
  }

  getTolltipState() {
    if(this.userState) {
      this.tooltipState = "Présent depuis 3h25";
    } else {
      this.tooltipState = "Absent";
    }
  }

}
