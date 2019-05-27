import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserService} from "../services/user.service";
import { Chart } from 'chart.js'
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges  {

  @Input() id_user;
  PieChart = [];
  startDateTime ;
  form: FormGroup;
  endDateTime ;
  selectWeek = 1;
  dateSelected;


  constructor(private userService: UserService) {
    this.getPieChart()

  }

  ngOnInit() {
    this.initDate();
    this.getPieChart()

  }

  /**
   * update the id of user when his change
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getPieChart()
  }

  /**
   * Define the previous week
   */
  onPrevWeek() {
    this.selectWeek += 1;
    this.initDate();
    this.getPieChart();
  }

  /**
   * Define the next week
   */
  onNextWeek() {
    this.selectWeek -= 1;
    this.initDate();
    this.getPieChart();
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

  }

  getPieChart() {
    this.userService.getPieChart((dataFromBack, reasonFromBack) => {
      var nonJustifie = 35;
      dataFromBack.forEach(function (iJustifie){nonJustifie -= iJustifie});
      dataFromBack.push(nonJustifie);
      reasonFromBack.push("Non Justifié");

      this.PieChart = new Chart('pieChart', {
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
    }, this.id_user, this.startDateTime, this.endDateTime);
  }
}
