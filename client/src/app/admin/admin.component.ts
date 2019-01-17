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
  btnSideBar = this.faAngleDoubleRight;

  constructor() { }

  ngOnInit() {
    this.sidebarCollapse();
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
