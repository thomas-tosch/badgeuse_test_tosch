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
  usersList;
  startDate = '2019-01-07T00:00:00';
  endDate = '2019-01-11T23:59:59';
  activeGraph = false;
  data = [];
  colorState = [];

  // graph
  barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero:true
        },
      }]
    },
    annotation: {
      annotation: [{
        type: 'line',
        drawTime: 'afterDatasetsDraw',
        id: 'strip-line-1',
        mode: 'vertical',
        scaleID: 'y-axis-0',
        value: 30,
        borderColor: 'red',
        borderWidth: 3
      }]
    }
  };
  barChartLabels = [];
  barChartType = 'horizontalBar';
  barChartLegend = false;
  barChartData = [{
    data: this.data,
    label: 'Temps de présence'
  }];
  colors = [{
    backgroundColor: this.colorState
  }];

  constructor(private expressService: ExpressService) { }

  ngOnInit() {
    this.getTotalTime();
  }

  getTotalTime() {
    let content = {
      action: 'getTotalTime',
      startDate: this.startDate,
      endDate: this.endDate,
      userGroup: 1
    };
    this.expressService.postExpress('graph', content).subscribe((res: Auth) => {
      console.log(res.message);
      this.usersList = res.message;

        let i = 0;
        this.usersList.forEach((user)=> {
            this.barChartLabels.push(user.userName);
            let duration = user.duration.substr(0, 5).replace(':', '.');
            this.data.push(duration);
            if(duration > 35) {
                this.colorState.push('#71e597');
            } else {
                this.colorState.push('#df6e6e');
            }

            i++;
            if(i === this.usersList.length) {
                this.activeGraph = true;
            }

        });
    });
  }



}
