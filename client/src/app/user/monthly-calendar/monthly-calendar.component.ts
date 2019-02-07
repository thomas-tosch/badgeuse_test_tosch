import {Component, OnInit, ViewChild} from '@angular/core';
import {Auth} from "../../guards/auth";
import {CalendarService} from "../../services/calendar.service";
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import * as moment from 'moment';
import {UserService} from "../../services/user.service";

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
    id_user;

    constructor(private expressService: CalendarService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.getIdUser();
    }

    getIdUser() {
        this.userService.getIdUser((res) => {
            this.id_user = res;
            this.getBackend();
        })
    }

    getBackend() {

        const content = {
            id_user: this.id_user
        };
        let i = 0;
        this.expressService.postExpress('calendar', content).subscribe((res: Auth) => {
            this.absencesDates = res.list;

            if (this.absencesDates.length !== 0) {
                this.absencesDates.forEach((absence) => {
                    if (absence.status == 0) { // Absence refusée
                        this.eachDate.push(
                            {
                                start: absence.day,
                                end: absence.day,
                                rendering: 'background',
                                color: '#ff3c38',
                                title: absence.id
                            });
                    }
                    if (absence.status == 1) { // Absence validée
                        this.eachDate.push(
                            {
                                start: absence.day,
                                end: absence.day,
                                rendering: 'background',
                                color: '#0075ff',
                                title: absence.id
                            });
                    }
                    if (absence.status == 2) { // En attente
                        this.eachDate.push(
                            {
                                start: absence.day,
                                end: absence.day,
                                rendering: 'background',
                                color: '#ff912a',
                                title: absence.id
                            });
                    }
                    i++;
                    if (this.absencesDates.length === i) {
                        this.calendar();
                    }
                });
            } else {
                this.calendar();
            }
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