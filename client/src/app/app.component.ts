import {Component, OnInit} from '@angular/core';
import {ExpressService} from "./services/express.service";
import {UserService} from "./services/user.service";
import {faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";
import * as $ from 'jquery';
import {WebsocketService} from "./services/websocket.Service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;
  iconIn;
  iconOut;
  btnSideBar;
  adminActive = false;

  constructor(private expressService: ExpressService,
              private userService: UserService,
              private wsService: WebsocketService
  ) {
    // connect the socket.io and listen
    this.wsService.listenSocket();
  }

  ngOnInit() {
    this.defineIconList();
    this.closeListOnInit();
    this.isUserAdmin();
  }


  /**
   * check if user is a administrator
   */
  isUserAdmin() {
    this.userService.isUserAdmin((res)=>{this.adminActive = res});
  }

  /**
   * If true, show the menu. if false, hide the menu
   */
  getConnectStatus() {
    return this.userService.getConnectStatus();
  }

  closeListOnInit() {
    setTimeout(()=>{
      if(this.getConnectStatus()) {
        this.onBtnSideBar();
        this.isUserAdmin();
      } else {
        this.closeListOnInit();
      }
    },500);
  }

  /**
   * define the icon direction on function of the screen
   */
  defineIconList() {
    if($(window).width() > 991) {
      this.btnSideBar = this.faAngleDoubleRight;
      this.iconIn = this.faAngleDoubleRight;
      this.iconOut = this.faAngleDoubleLeft;
    } else {
      this.btnSideBar = this.faAngleDoubleUp;
      this.iconIn = this.faAngleDoubleUp;
      this.iconOut = this.faAngleDoubleDown;
    }
  }

  /**
   * icon for the button collapse
   */
  onBtnSideBar() {
    $('#sidebar').toggleClass('active');

    if(this.btnSideBar === this.iconOut){
      this.btnSideBar = this.iconIn;
    } else {
      this.btnSideBar = this.iconOut;
    }
  }




}
