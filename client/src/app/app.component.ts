import {Component, OnInit} from '@angular/core';
import {ExpressService} from "./services/express.service";
import {Auth} from "./guards/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  responseExpress;

  constructor(private expressService: ExpressService) {

  }

  ngOnInit() {
    this.test();
  }

  test() {
    let contentPost = {
      action: 'test'
    };
    this.expressService.postExpress('test',contentPost).subscribe((resp: Auth) => {
      this.responseExpress = resp.message;
    });
  }
}
