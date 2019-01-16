import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id_user;
  userData = {};

  constructor(private expressService: ExpressService,
              private userService: UserService,
              private route: ActivatedRoute)
  {  }

  ngOnInit() {
    // refresh all param when route snapshot paramas change
    this.route.params.subscribe(() => {
      this.id_user = this.route.snapshot.params['id_user'];
      this.getUser();
    });

  }

  getUser() {
    this.userService.getDataUser((res)=> {
      // console.log(res);
      this.userData = res;
    }, this.id_user);
  }

}
