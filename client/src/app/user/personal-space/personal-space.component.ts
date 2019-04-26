import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.css']
})
export class PersonalSpaceComponent implements OnInit {

  monthActive = 'month';
  id_user;
  currentDate = new Date().toISOString().slice(0, 10);
  PieChart = [];

  constructor(private userService: UserService) {
    this.getIdUser();
    this.getPieChart()
  }

  ngOnInit() {
    this.getPieChart()
  }

  /**
   * get the id of user connected
   */
  getIdUser() {
    this.userService.getIdUser((id) => {
      this.id_user = id;
    });
  }

  getPieChart() {
    this.userService.getPieChart((dataFromBack, reasonFromBack) => {
        console.log("dataFromBack : " + dataFromBack);
        console.log("reasonFromBack : " + reasonFromBack);
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
    });
  }


}
