import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  variableTest;
  startDate = '2019-01-07T00:00:00';
  endDate = '2019-01-11T23:59:59';
  activeGraph = false;

  // graph
  barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  };
  barChartLabels = [];
  barChartType = 'horizontalBar';
  barChartLegend = false;
  data = [];
  barChartData = [{
    data: [12, 32, 10, 25],
    label: 'Temps de présence',
    backgroundColor: 'rgba(0, 255, 0, 0.8)'
  }];

  constructor(private expressService: ExpressService) { }

  ngOnInit() {
    this.getdb();
  }

  getdb() {
    let content = {
      action: 'getDb',
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.expressService.postExpress('graph', content).subscribe((res: Auth) => {
      console.log(res.message);
      this.variableTest = res.message;

      let i = 0;
      this.variableTest.forEach((user)=> {
        this.barChartLabels.push(user.userName);
        this.data.push(user.duration.substr(0, 5).replace(':', '.'));

        i++;
        if(i === this.variableTest.length) {
          this.activeGraph = true;
        }

      });
    });
  }




}
