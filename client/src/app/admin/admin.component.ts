import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {faFilter, faTachometerAlt, faAngleDoubleLeft, faAngleDoubleRight, faFileAlt, faUserCog, faChartLine} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faTachometerAlt = faTachometerAlt;
  faFilter = faFilter;
  faFileAlt = faFileAlt;
  faUserCog = faUserCog;
  faChartLine = faChartLine;
  btnSideBar = this.faAngleDoubleLeft;

  constructor() { }

  ngOnInit() {
    this.sidebarCollapse();
  }

  // icon for the button collapse
  onBtnSideBar() {
    if(this.btnSideBar === this.faAngleDoubleLeft){
      this.btnSideBar = this.faAngleDoubleRight;
    } else {
      this.btnSideBar = this.faAngleDoubleLeft;
    }
  }

  // collapse the sidebar
  sidebarCollapse() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }

}
