import {Component, OnInit} from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {HebdoComponent} from "../hebdo/hebdo.component";
import {Chart} from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  listSubscription: Subscription;
  usersList;
  activeGraph = true;
  data = [];
  colorState = [];

  // graph option
    barChartOptions = {
    scaleShowVerticalLines: true,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
            beginAtZero:true
        },
      }]
    },
    onClick: this.onClickBar,
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
    label: 'Total en heure'
  }];
  colors = [{
    backgroundColor: this.colorState
  }];




  constructor(private expressService: ExpressService,
              private formBuilder: FormBuilder,
              private graph: HebdoComponent) { }

  ngOnInit() {
      this.listSubscription = this.graph.userListSubject.subscribe(
          (userList: any[]) => {
              this.usersList = userList;
              this.setGraphic();
          }
      );
  }


  onClickBar(table, bar) {
      if(bar[0] !== undefined) {
          console.log(bar[0]._model.label);
      }
  }



    setGraphic() {
      this.data.length = 0;
      this.barChartLabels = [];
      this.colorState.length = 0;

      this.usersList.forEach((user)=> {
          this.barChartLabels.push(user.userName);

          let duration = user.duration.substr(0, 5).replace(':', '.');
          this.data.push(duration);

          if(duration > 35) {
              this.colorState.push('#71e597');
          } else {
              this.colorState.push('#df6e6e');
          }
      });

        $('#myChart').attr("height", this.usersList.length * 20);

  }



}
