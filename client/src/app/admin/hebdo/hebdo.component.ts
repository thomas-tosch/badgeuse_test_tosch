import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import * as $ from 'jquery';

@Component({
  selector: 'app-hebdo',
  templateUrl: './hebdo.component.html',
  styleUrls: ['./hebdo.component.css']
})
export class HebdoComponent implements OnInit {

  userList;
  startDate;
  endDate;
  startDateTime;
  endDateTime;
  selectWeek = 1;
  checkbox1 = true;
  checkbox2 = true;
  checkbox3 = true;
  checkbox4 = false;

  constructor(private expressService: ExpressService) { }

  ngOnInit() {
    this.initDate();

  }

  onPrevWeek() {
    this.selectWeek += 1;
    this.initDate();
  }
  onNextWeek() {
    this.selectWeek -= 1;
    this.initDate();
  }

  initDate() {
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay() + 1 - (7 * this.selectWeek); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    this.startDateTime = new Date(curr.setDate(first)).toISOString();
    this.endDateTime = new Date(curr.setDate(last)).toISOString();
    this.userList = [];
    this.getUserListHebdo();
  }

  getUserListHebdo() {
    let content = {
      action: 'getUserListHebdo',
      startDate: this.startDateTime,
      endDate: this.endDateTime
    };
    this.expressService.postExpress('hebdo', content).subscribe((res: Auth) => {
      this.userList = res.list;
    })
  }

  onClick() {
    console.log('test');
  }


}
