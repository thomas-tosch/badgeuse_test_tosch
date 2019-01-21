import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from "@angular/forms";

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
  form: FormGroup;

  constructor(private expressService: ExpressService,
              private formBuilder: FormBuilder)
  {
      this.createForm();
  }

  ngOnInit() {
    this.initDate();
  }

    // create the login form
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

    onSubmit() {
      let checkbox1 = this.form.get('checkbox1').value;
      let checkbox2 = this.form.get('checkbox2').value;
      let checkbox3 = this.form.get('checkbox3').value;
      let checkbox4 = this.form.get('checkbox4').value;
        console.log('checkbox1', checkbox1, 'checkbox2', checkbox2, 'checkbox3', checkbox3, 'checkbox4', checkbox4);

    }


}
