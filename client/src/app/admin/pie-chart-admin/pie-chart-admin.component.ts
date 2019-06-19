import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserService} from "../../services/user.service";
import { Chart } from 'chart.js'
import {FormGroup} from "@angular/forms";
import {HebdoComponent} from '../hebdo/hebdo.component';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pie-chart-admin',
  templateUrl: './pie-chart-admin.component.html',
  styleUrls: ['./pie-chart-admin.component.css']
})
export class PieChartAdminComponent implements OnInit, OnChanges  {

  @Input() startDate;
  PieChartAdmin = [];
  startDateTime;
  form: FormGroup;
  endDateTime;
  selectWeek = 1;
  listSubscription: Subscription;
  usersList;

  constructor(private userService: UserService,
              private hebdoComponent: HebdoComponent) {
    this.getPieChartAdmin();

  }

  ngOnInit() {
    this.initDate();
    this.getPieChartAdmin();
    this.refreshGraphic();
  }

  /**
   * update the id of user when his change
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getPieChartAdmin();
  }

  /**
   * Define the previous week
   */
  onPrevWeek() {
    this.selectWeek += 1;
    this.initDate();
    this.getPieChartAdmin();
  }

  /**
   * Define the next week
   */
  onNextWeek() {
    this.selectWeek -= 1;
    this.initDate();
    this.getPieChartAdmin()
  }

  /**
   * subscription, update the data of graphic
   */
  refreshGraphic() {
    this.listSubscription = this.hebdoComponent.userListSubject.subscribe(
        (userList: any[]) => {
          this.usersList = userList;
          this.getPieChartAdmin()
        }
    );
  }

  /**
   *  initializes the date of week
   */
  initDate() {
    const currFirst = new Date; // get current date for first
    const currLast = new Date; // get current date for last
    const first = currFirst.getDate() - currFirst.getDay() + 1 - (7 * this.selectWeek); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    this.startDateTime = new Date(currFirst.setHours(1, 0, 0, 0)); // set time at start day 00:00
    this.startDateTime = new Date(currFirst.setDate(first)).toISOString(); // set first day of week
    this.endDateTime = new Date(currLast.setHours(23, 59, 59, 0)); // set time at end day 23:00
    this.endDateTime = new Date(currLast.setDate(last)).toISOString(); // set last day of the week

    console.log(this.startDateTime);
    console.log(this.endDateTime);
  }

  getPieChartAdmin() {
    this.userService.getPieChartAdmin((dataFromBack, reasonFromBack) => {
      let nonJustifie = 35*50;
      //console.log('data pieChartAdmin')
      //console.log(dataFromBack);
      //console.log(reasonFromBack);
      dataFromBack.forEach(function (iJustifie){nonJustifie -= iJustifie});
      dataFromBack.push(nonJustifie);
      reasonFromBack.push("Non Justifié");

      this.PieChartAdmin = new Chart('pieChartAdmin', {
        type: 'pie',
        data: {
          labels: reasonFromBack,

          datasets: [{
            label: '# of Votes',
            data: dataFromBack,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          title:{
            text:"Répartitions des heures",
            display:true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    }, this.startDateTime, this.endDateTime);
  }
}
