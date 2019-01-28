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
        defaultView : 'agendaWeek',
        showNonCurrentDates : true,
        weekends : false,
        locale : 'fr',
        editable : true,
        eventLimit : false,
        header : {
            left : 'title',
            center : '',
            right : 'prev, month, agendaWeek, next'
        },
        buttonText : {
            month:    'Mois',
            week:     'Semaine'
        },
        // events: data
    };
  }
}