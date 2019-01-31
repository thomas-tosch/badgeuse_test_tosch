import {Component, Input, OnInit} from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import {WebsocketService} from "../../services/websocket.Service";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  userList;
  userOn = [];
  userOff = [];
  @Input() adminActive;

  faCircle = faCircle;

  constructor(private expressService: ExpressService,
              private wsService: WebsocketService)
  {
    // refresh the list when a user badge or unbadge
    this.wsService.onListen.subscribe(() => {
      this.onRefresh();
    });
  }

  ngOnInit() {
    this.getUserList();
  }

  // get the user list to the db
  getUserList() {
    let content = {
      action: 'getUserList'
    };
    this.expressService.postExpress('liste', content).subscribe((res: Auth) => {
      if(!res.success) {
        swal('Oups !', res.message, 'error');
      } else {
        this.userList = res.list;
        this.splitPresence();
      }
    })
  }

  // split user of presence or not
  splitPresence() {
    this.userList.forEach((user) => {
      if(user.presence === 1) {
        this.userOn.push(user);
      } else {
        this.userOff.push(user);
      }
    })
  }

  // refresh function
  onRefresh() {
    this.userList = [];
    this.userOn = [];
    this.userOff = [];
    this.getUserList();
  }



}
