import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import { interval } from 'rxjs';
import { Subject } from "rxjs";
import {GraphicService} from "../../services/graphic.service";


@Component({
  selector: 'app-hebdo',
  templateUrl: './hebdo.component.html',
  styleUrls: ['./hebdo.component.css']
})
export class HebdoComponent implements OnInit {

  userList;
  userListSubject = new Subject<any[]>();
  startDateTime;
  endDateTime;
  selectWeek = 1;
  form: FormGroup;
  checkbox1 = '';
  checkbox2 = '';
  checkbox3 = '';
  checkbox4 = '';
  filterGroup = '1,2,3';

  secondes: number

  constructor(private expressService: ExpressService,
              private formBuilder: FormBuilder,
              private graphicService: GraphicService)
  {
      this.createForm();
  }

  ngOnInit() {
    this.initDate();
    this.test();
  }

  emitUserListSubject() {
    this.userListSubject.next(this.userList.slice());
  }

  // create the checkbox form
  createForm() {
    this.form = this.formBuilder.group({
        checkbox1: [true, ],
        checkbox2: [true, ],
        checkbox3: [true, ],
        checkbox4: [false, ]
    });
  }

  onPrevWeek() {
    this.selectWeek += 1;
    this.initDate();
  }
  onNextWeek() {
    this.selectWeek -= 1;
    this.initDate();
  }

  // initializes the date
  initDate() {
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay() + 1 - (7 * this.selectWeek); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    this.startDateTime = new Date(curr.setDate(first)).toISOString();
    this.endDateTime = new Date(curr.setDate(last)).toISOString();
    this.userList = [];
    this.getUserListHebdo();
  }

  // get the user  list to db
  getUserListHebdo() {
    let content = {
      action: 'getUserListHebdo',
      startDate: this.startDateTime,
      endDate: this.endDateTime,
      filterGroup: this.filterGroup
    };
    this.expressService.postExpress('hebdo', content).subscribe((res: Auth) => {
      this.userList = res.list;
      this.emitUserListSubject();
    })
  }

  // initializes the group selected
  onInitGroup() {
    if(this.form.get('checkbox1').value){this.checkbox1 = '1,';}else{this.checkbox1 = '';}
    if(this.form.get('checkbox2').value){this.checkbox2 = '2,';}else{this.checkbox2 = '';}
    if(this.form.get('checkbox3').value){this.checkbox3 = '3,';}else{this.checkbox3 = '';}
    if(this.form.get('checkbox4').value){this.checkbox4 = '4,';}else{this.checkbox4 = '';}

    this.filterGroup = this.checkbox1 + this.checkbox2 + this.checkbox3 + this.checkbox4;
    this.filterGroup = this.filterGroup.substring(null,this.filterGroup.length-1);

    this.getUserListHebdo();
  }

  test() {

  }


}
