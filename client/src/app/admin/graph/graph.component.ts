import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import {OrderPipe} from "ngx-order-pipe";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  variableTest;

  constructor(private expressService: ExpressService,
              private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getdb();
  }

  getdb() {
    let content = {
      action: 'getDb'
    };
    this.expressService.postExpress('graph', content).subscribe((res: Auth) => {
      console.log(res.message);
      this.variableTest = res.message;
      this.variableTest = this.orderPipe.transform(this.variableTest, 'order_point, id_user', false);
    });
  }

}
