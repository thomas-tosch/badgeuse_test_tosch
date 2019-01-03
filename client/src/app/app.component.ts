import {Component, OnInit} from '@angular/core';
import {ExpressService} from "./services/express.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private expressService: ExpressService,
              private userService: UserService
  ) {  }

  ngOnInit() {
    console.log(this.getConnectStatus());
  }

  // If true, show the menu. if false, hide the menu
  getConnectStatus() {
    return this.userService.getConnectStatus();
  }

}
