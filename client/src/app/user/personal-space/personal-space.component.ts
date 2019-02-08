import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.css']
})
export class PersonalSpaceComponent implements OnInit {

  monthActive = 'month';
  id_user;

  constructor(private userService: UserService) {
    this.getIdUser();
  }

  ngOnInit() {
  }

  getIdUser() {
    this.userService.getIdUser((id) => {
      this.id_user = id;
    });
  }
}
