import {Component, OnInit, ViewChild} from '@angular/core';
import {Auth} from "../../guards/auth";
import {CalendarService} from "../../services/calendar.service";
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import * as moment from 'moment';

@Component({
    selector: 'app-monthly-calendar',
    templateUrl: './monthly-calendar.component.html',
    styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit {
    calendarOptions: Options;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    absencesDates;
    eachDate = [];

    constructor(private expressService: CalendarService) {
    }

    ngOnInit() {

        this.getBackend();

    }

    getBackend() {

        const content = {
            absences: ''
        };
        let i = 0;
        this.expressService.postExpress('calendar', content).subscribe((res: Auth) => {
            this.absencesDates = res.list;

            this.absencesDates.forEach((absence) => {
                if (absence.status == 0) {
                    this.eachDate.push(
                        {
                            start: absence.day,
                            end: absence.day,
                            rendering: 'background',
                            color: '#ff3c38'
                        });
                }
                if (absence.status == 1) {
                    this.eachDate.push(
                        {
                            start: absence.day,
                            end: absence.day,
                            rendering: 'background',
                            color: '#ff912a'
                        });
                }
                if (absence.status == 2) {
                    this.eachDate.push(
                        {
                            start: absence.day,
                            end: absence.day,
                            rendering: 'background',
                            color: '#3b49ff'
                        });
                }

                i++;
                if (this.absencesDates.length === i) {
                    this.calendar();
                }
            })
        });

    }

    calendar() {
        this.calendarOptions = {
            defaultView: 'agendaWeek',
            showNonCurrentDates: true,
            weekends: false,
            locale: 'fr',
            editable: true,
            eventLimit: false,
            slotLabelFormat: 'H(:mm)',
            allDaySlot: false,
            minTime: moment.duration('07:00:00'),
            maxTime: moment.duration('20:00:00'),
            height: 730,
            header: {
                left: 'title',
                center: '',
                right: 'prev, agendaWeek, month, next'
            },
            buttonText: {
                month: 'Mois',
                week: 'Semaine'
            },
            events:
            this.eachDate
            // {
            //     start: '2019-02-01T08:25:16',
            //     end: '2019-02-01T17:08:52',
            //     rendering: 'background'
            // }
            ,
        };
    }
}