import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {HebdoComponent} from "../hebdo/hebdo.component";
import {Chart} from 'chart.js';
import * as $ from 'jquery';
import 'chartjs-plugin-annotation';


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

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private hebdoComponent: HebdoComponent,
              private router: Router) { }

  ngOnInit() {
      // subscription, update the data of graphic
      this.listSubscription = this.hebdoComponent.userListSubject.subscribe(
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
      // clear all array of graphic
      this.data.length = 0;
      this.barChartLabels = [];
      this.colorState.length = 0;

      this.usersList.forEach((user)=> {
          // build userName array
          this.barChartLabels.push(user.userName);

          // build data array
          let duration = user.duration.substr(0, 5).replace(':', '.');
          this.data.push(duration);

          // build color array
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
