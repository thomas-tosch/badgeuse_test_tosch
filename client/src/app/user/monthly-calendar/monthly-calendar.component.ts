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

    constructor(private expressService: CalendarService) {
    }

    ngOnInit() {

        this.getBackend();

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
            events: [
                {
                    start: '2019-02-01T08:25:16',
                    end: '2019-02-01T17:08:52',
                    rendering: 'background'
                },
                {
                    start: '2019-01-31',
                    end: '2019-01-31',
                    rendering: 'background',
                    color: '#FF6347'
                }
            ],
        };
    }

    getBackend() {

        const content = {
            absences: ''
        };
        this.expressService.postExpress('calendar', content).subscribe((res: Auth) => {
            let absencesDates = res.list;
            console.log(absencesDates);
        });
    }
}