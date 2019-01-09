import { Component, OnInit } from '@angular/core';
import {faAddressCard, faChessQueen, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";

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
  badgerActive = true;

  constructor(private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser(){
    this.userService.getDataUser((res)=> {
      this.userData = res;
    });
  }

    // logOut the user
    onDisconnect() {
        this.loginService.logout();
    }

}
