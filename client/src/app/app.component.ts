import {Component, OnInit} from '@angular/core';
import {ExpressService} from "./services/express.service";
import {Auth} from "./guards/auth";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  responseExpress;

  constructor(private expressService: ExpressService,
              private userService: UserService
  ) {

  }

  ngOnInit() {
    console.log(this.getConnectStatus());
  }

  // If true, show the dashboard. if false, show the direct router
  getConnectStatus() {
    return this.userService.getConnectStatus();
  }

}
