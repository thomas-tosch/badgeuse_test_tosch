import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {faCheckCircle, faTimesCircle, faSpinner, faBell} from '@fortawesome/free-solid-svg-icons';
import {BadgerService} from "../../services/badger.service";
import swal from 'sweetalert2';

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
  faBell = faBell;


  constructor(private loginService: LoginService,
              private badgerService: BadgerService) { }

  ngOnInit() {
    this.getTemoinStatus();
  }

  // Update the presence to users table (1 = 'présent', 0 = 'absent') and add a point to badger table
  onBadge() {
      this.buttonActivate = true;
      this.badgerService.setPresence(this.presence,(res)=> {
        if(res.success === true) {
          swal(res.title, res.message, 'success');
          this.presence = !this.presence;
          this.getTemoinStatus();
          // disable the button during 5 secondes
          setTimeout(()=>{
            this.buttonActivate = false;
          }, 5000); //after 5 secondes
        }
      });
  }

  // change the icon temoin
  getTemoinStatus() {
    if(this.presence) {
      this.temoinState = faCheckCircle;
      this.tooltipState = "Présent";
      return 'green';
    } else {
      this.temoinState = faTimesCircle;
      this.tooltipState = "Absent";
      return 'red';
    }
  }



}
