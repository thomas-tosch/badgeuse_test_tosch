import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {faCheckCircle, faTimesCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {BadgerService} from "../../services/badger.service";

@Component({
  selector: 'app-badger',
  templateUrl: './badger.component.html',
  styleUrls: ['./badger.component.css']
})
export class BadgerComponent implements OnInit {

  tooltipState;
  temoinState;
  buttonActivate = false;
  @Input() presence;
  @Input() id_user;

  constructor(private loginService: LoginService,
              private badgerService: BadgerService) { }

  ngOnInit() {
    this.getTolltipState();
    this.getTemoinStatus();
  }

  // for test, set the user state. true = 'présent', false = 'absent'
  onBadge() {
      this.buttonActivate = true;
      this.badgerService.setPresence(this.presence,(res)=> {
        if(res === true) {
          this.presence = !this.presence;
          this.getTolltipState();
          this.getTemoinStatus();
          setTimeout(()=>{
            this.buttonActivate = false;
          }, 5000); //after 5 secondes
        }
      });
  }

  // logOut the user
  onDisconnect() {
    this.loginService.logout();
  }

  getTemoinStatus() {
    if(this.presence) {
      this.temoinState = faCheckCircle;
      return 'green';
    } else {
      this.temoinState = faTimesCircle;
      return 'red';
    }
  }

  getTolltipState() {
    if(this.presence) {
      this.tooltipState = "Présent depuis 3h25";
    } else {
      this.tooltipState = "Absent";
    }
  }

}
