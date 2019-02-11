import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Auth} from '../../guards/auth';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import * as moment from 'moment';
import * as $ from 'jquery';
import {ExpressService} from '../../services/express.service';

@Component({
    selector: 'app-monthly-calendar',
    templateUrl: './monthly-calendar.component.html',
    styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit, OnChanges {

    calendarOptions: Options;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    @Input() monthActive = 'month';
    @Input() id_user;
    absencesDates;
    eachDate = [];
    id_user;
    @Input() selectedWeek;
    backgroundColor;
    startWeek;
    endWeek;

    constructor(private expressService: ExpressService) { }

    ngOnInit() { }

    /**
     * update the id of user when his change
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.id_user = changes.id_user.currentValue;
        this.getBackend();
    }


    /**
     * edit and define each date of calendar
     */
    getBackend() {
        this.absencesDates = 0;
        this.eachDate = [];
        const content = {
            id_user: this.id_user
        };
        let i = 0;
        this.expressService.postExpress('calendar', content).subscribe((res: Auth) => {
            this.absencesDates = res.list;

            if (this.absencesDates.length !== 0) {
                this.absencesDates.forEach((absence) => {
                    if (absence.status === 0 && absence.half === 0) { // Absence refusée
<<<<<<< client/src/app/user/monthly-calendar/monthly-calendar.component.ts
                        this.backgroundColor = '#ff3c38';
                        this.startWeek = absence.day + 'T09:00:00';
                        this.endWeek = absence.day + 'T17:00:00';

                    }
                    if (absence.status === 1 && absence.half === 0) { // Absence validée
                        this.backgroundColor = '#0075ff';
                        this.startWeek = absence.day + 'T09:00:00';
                        this.endWeek = absence.day + 'T17:00:00';
                    }
                    if (absence.status === 2 && absence.half === 0) { // En attente
                        this.backgroundColor = '#ff912a';
                        this.startWeek = absence.day + 'T09:00:00';
                        this.endWeek = absence.day + 'T17:00:00';
                    }
                    // DEMI JOURNEE MATIN
                    if (absence.status === 0 && absence.half === 1) { // Absence refusée
                        this.backgroundColor = '#ff3c38';
                        this.startWeek = absence.day + 'T09:00:00';
                        this.endWeek = absence.day + 'T12:30:00';
                    }
                    if (absence.status === 1 && absence.half === 1) { // Absence validée
                        this.backgroundColor = '#0075ff';
                        this.startWeek = absence.day + 'T09:00:00';
                        this.endWeek = absence.day + 'T12:30:00';
                    }
                    if (absence.status === 2 && absence.half === 1) { // En attente
                        this.backgroundColor = '#ff912a';
                        this.startWeek = absence.day + 'T09:00:00';
                        this.endWeek = absence.day + 'T12:30:00';
                    }
                    // DEMI JOURNEE APRES MIDI
                    if (absence.status === 0 && absence.half === 2) { // Absence refusée
                        this.backgroundColor = '#ff3c38';
                        this.startWeek = absence.day + 'T13:30:00';
                        this.endWeek = absence.day + 'T17:00:00';
                    }
                    if (absence.status === 1 && absence.half === 2) { // Absence validée
                        this.backgroundColor = '#0075ff';
                        this.startWeek = absence.day + 'T13:30:00';
                        this.endWeek = absence.day + 'T17:00:00';
                    }
                    if (absence.status === 2 && absence.half === 2) { // En attente
                        this.backgroundColor = '#ff912a';
                        this.startWeek = absence.day + 'T13:30:00';
                        this.endWeek = absence.day + 'T17:00:00';
                    }
                    this.eachDate.push(
                        {
                            start: absence.day,
                            end: absence.day,
                            backgroundColor: this.backgroundColor,
                            rendering: 'background'
                        },
                        {
                            start: this.startWeek,
                            end: this.endWeek,
                            textColor: '#111',
                            title: absence.reason.toUpperCase(),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent'
                        },
                        {
                            start: this.startWeek,
                            end: this.endWeek,
                            backgroundColor: this.backgroundColor,
                            rendering: 'background'
                        }
                    );
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

    /**
     * set the calendar option and refresh
     */
    calendar() {

        // remove event calendar
        $('#Calendar').fullCalendar('removeEvents'); // remove all events

        this.calendarOptions = {
            defaultView: this.monthActive,
            showNonCurrentDates: true,
            defaultDate: this.selectedWeek,
            weekends: false,
            locale: 'fr',
            editable: false,
            eventLimit: false,
            slotLabelFormat: 'HH:mm',
            allDaySlot: false,
            timeFormat: 'HH:mm',
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
            events: this.eachDate
        };

        // add and refresh event calendar
        $('#Calendar').fullCalendar('addEventSource', this.eachDate); // add new events
        $('#Calendar').fullCalendar('rerenderEvents'); // refresh
    }
}
