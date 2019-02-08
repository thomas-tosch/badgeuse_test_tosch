import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
    @Input() monthActive = 'month';
    @Input() id_user;
    absencesDates;
    eachDate = [];

    constructor(private expressService: CalendarService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.getIdUser();
    }

    getIdUser() {
        if (this.id_user === undefined) {
            this.userService.getIdUser((res) => {
                this.id_user = res;
                this.getBackend();
            });
        } else {
            this.getBackend();
        }
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
                                textColor: '#111',
                                title: absence.reason.toUpperCase(),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent'
                            },
                            {
                                start: absence.day,
                                end: absence.day,
                                backgroundColor: '#ff3c38',
                                rendering: 'background'
                            }
                            );
                    }
                    if (absence.status == 1) { // Absence validée
                        this.eachDate.push(
                            {
                                start: absence.day,
                                end: absence.day,
                                textColor: '#111',
                                title: absence.reason.toUpperCase(),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent'
                            },
                            {
                                start: absence.day,
                                end: absence.day,
                                backgroundColor: '#0075ff',
                                rendering: 'background'
                            }
                            );
                    }
                    if (absence.status == 2) { // En attente
                        this.eachDate.push(
                            {
                                start: absence.day,
                                end: absence.day,
                                textColor: '#111',
                                title: absence.reason.toUpperCase(),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent'
                            },
                            {
                                start: absence.day,
                                end: absence.day,
                                backgroundColor: '#ff912a',
                                rendering: 'background'
                            }
                            );
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
            defaultView: this.monthActive,
            showNonCurrentDates: true,
            weekends: false,
            locale: 'fr',
            editable: false,
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