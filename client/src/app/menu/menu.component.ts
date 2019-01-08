import { Component, OnInit } from '@angular/core';
import {faAddressCard, faChessQueen, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faChessQueen = faChessQueen;
  faUserAstronaut = faUserAstronaut;
  faAddressCard = faAddressCard;
  userData = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser(){
    this.userService.getDataUser((res)=> {
      this.userData = res;
    });
  }



}
