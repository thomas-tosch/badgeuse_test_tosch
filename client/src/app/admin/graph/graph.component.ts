import {Component, OnInit, ViewChild} from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  usersList;
  startDate = '2019-01-07T00:00:00';
  endDate = '2019-01-11T23:59:59';
  activeGraph = false;
  data = [];
  colorState = [];
    formSelectGroup: FormGroup;

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
    chart: BaseChartDirective; // Now you can reference your chart via `this.chart`

  constructor(private expressService: ExpressService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getTotalTime(1);
    this.createForm();
  }

    onClickBar(table, bar) {
      if(bar[0] !== undefined) {
          console.log(bar[0]._model.label);
      }
  }

  onSelectGroup() {
      this.data = [];
      this.barChartLabels = [];
      this.getTotalTime(this.formSelectGroup.get('userGroup').value);
  }

    // create the login form
    createForm() {
        this.formSelectGroup = this.formBuilder.group({
            userGroup: ['']
        });
    }

  getTotalTime(userGroup) {
    let content = {
      action: 'getTotalTime',
      startDate: this.startDate,
      endDate: this.endDate,
      userGroup: userGroup
    };
    this.expressService.postExpress('graph', content).subscribe((res: Auth) => {
      // console.log(res.message);
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
                this.chart.chart.update();
            }

        });
    });
  }



}
