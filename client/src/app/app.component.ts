import {Component, OnInit} from '@angular/core';
import {ExpressService} from "./services/express.service";
import {UserService} from "./services/user.service";
import {faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";
import * as $ from 'jquery';

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

  constructor(private expressService: ExpressService,
              private userService: UserService
  ) {  }

  ngOnInit() {
    this.defineIconList();

    this.closeListOnInit();
  }

  // If true, show the menu. if false, hide the menu
  getConnectStatus() {
    return this.userService.getConnectStatus();
  }

  closeListOnInit() {
    setTimeout(()=>{
      if(this.getConnectStatus()) {
        this.onBtnSideBar();
      } else {
        this.closeListOnInit();
      }
    },500);
  }

  // define the icon direction on function of the screen
  defineIconList() {
    if($(window).width() > 991) {
      this.iconIn = this.faAngleDoubleRight;
      this.iconOut = this.faAngleDoubleLeft;
    } else {
      this.iconIn = this.faAngleDoubleUp;
      this.iconOut = this.faAngleDoubleDown;
    }
  }

  // icon for the button collapse
  onBtnSideBar() {
    $('#sidebar').toggleClass('active');

    if(this.btnSideBar === this.iconOut){
      this.btnSideBar = this.iconIn;
    } else {
      this.btnSideBar = this.iconOut;
    }
  }




}
