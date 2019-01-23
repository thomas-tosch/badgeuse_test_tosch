import {Component, OnInit} from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {HebdoComponent} from "../hebdo/hebdo.component";
import {Chart} from 'chart.js';
import * as $ from 'jquery';
import 'chartjs-plugin-annotation';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
            beginAtZero:true,
            max: 50
        },
      }]
    },
    onClick: this.onClickBar.bind(this),
      annotation: {
          annotations: [{
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: 35,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                  enabled: false,
                  content: 'Test label'
              }
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
              private userService: UserService,
              private formBuilder: FormBuilder,
              private graph: HebdoComponent,
              private router: Router) { }

  ngOnInit() {
      this.listSubscription = this.graph.userListSubject.subscribe(
          (userList: any[]) => {
              this.usersList = userList;
              this.setGraphic();
          }
      );
  }

  // on click on bar graphic
  onClickBar(table, bar) {
      if(bar[0] !== undefined) {
          let userName = bar[0]._model.label;
          this.getIdUser((userId)=>{
              this.router.navigate(['userDetail/'+userId]);
          }, userName);
      }
  }

  // get the id user select on click
  getIdUser(callback, userName?) {
      this.userService.getIdUser((res) => {
          return callback(res);
      }, userName);
  }

  // Build and update the graphic data
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
      // Dynamic height of graphic
      $(".cadre-graph").height((this.usersList.length * 27.5));
  }



}
