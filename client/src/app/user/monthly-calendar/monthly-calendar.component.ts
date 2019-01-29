import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import * as moment from 'moment';

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
        slotLabelFormat : 'H(:mm)',
        allDaySlot : false,
        minTime : moment.duration('07:00:00'),
        maxTime : moment.duration('20:00:00'),
        height : 730,
        header : {
            left : 'title',
            center : '',
            right : 'prev, agendaWeek, month, next'
        },
        buttonText : {
            month:    'Mois',
            week:     'Semaine'
        },
        // events: data
    };
  }
}