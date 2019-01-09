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
  userData = {};
  badgerActive = true;
  adminActive = false;

  constructor(private userService: UserService,
              private loginService: LoginService) { }

    ngOnInit() {
        this.getDataUser();
    }

    // get all data of user
    getDataUser(){
        this.userService.getDataUser((res)=> {
          this.userData = res;
          // activate administrator access if role = 3
          if(res.id_role === 3){
              this.adminActive = true;
          }
        });
    }

    // logOut the user
    onDisconnect() {
        this.loginService.logout();
    }


//
}
