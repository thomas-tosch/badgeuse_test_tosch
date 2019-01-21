import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";
import {Subscription} from "rxjs";
import {HebdoComponent} from "../hebdo/hebdo.component";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  usersList;
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
            beginAtZero:true,
            max: 60
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
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`

    listSubscription: Subscription;

  constructor(private expressService: ExpressService,
              private formBuilder: FormBuilder,
              private graph: HebdoComponent) { }

  ngOnInit() {
      // setTimeout(()=>{
      //     this.setGraphic();
      // },500);

      this.listSubscription = this.graph.userListSubject.subscribe(
          (userList: any[]) => {
              this.usersList = userList;
              this.setGraphic();
          }
      );
      // this.graph.emitUserListSubject();
  }

  onClickBar(table, bar) {
      if(bar[0] !== undefined) {
          console.log(bar[0]._model.label);
      }
  }

  setGraphic() {
      this.data = [];
      this.barChartLabels = [];

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
              // this.chart.chart.update();
          }

      });

  }



}
