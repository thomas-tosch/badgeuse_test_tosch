import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit {

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() {}
  ngOnInit() {
    this.calendarOptions = {
        showNonCurrentDates : true,
        weekends : false,
        locale: 'fr',
        editable: true,
        eventLimit: false,
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
      // events: data
    };
  }

}