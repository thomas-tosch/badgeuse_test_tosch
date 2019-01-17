import {Component, OnInit} from '@angular/core';
import {ExpressService} from "./services/express.service";
import {UserService} from "./services/user.service";
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  btnSideBar = this.faAngleDoubleLeft;

  constructor(private expressService: ExpressService,
              private userService: UserService
  ) {  }

  ngOnInit() {
    this.sidebarCollapse();
    $('#sidebar').toggleClass('active');
  }

  // If true, show the menu. if false, hide the menu
  getConnectStatus() {
    return this.userService.getConnectStatus();
  }

  // icon for the button collapse
  onBtnSideBar() {
    if(this.btnSideBar === this.faAngleDoubleRight){
      this.btnSideBar = this.faAngleDoubleLeft;
    } else {
      this.btnSideBar = this.faAngleDoubleRight;
    }
  }

  // collapse the sidebar
  sidebarCollapse() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }

}
