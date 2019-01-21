import { Component, OnInit } from '@angular/core';
import {faAddressCard, faChessQueen, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";
import {ExpressService} from "../services/express.service";
import {Auth} from "../guards/auth";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faChessQueen = faChessQueen;
  faUserAstronaut = faUserAstronaut;
  faAddressCard = faAddressCard;
  userData;
  nomUser;
  prenomUser;
  presenceUser;
  idUser;
  badgerActive;
  adminActive = false;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private expressService: ExpressService) { }

    ngOnInit() {
        this.badgerActive = false;
        this.getDataUser();
        this.getAccessBadger();
    }

    // get all data of user
    getDataUser(){
        this.userService.getDataUser((res)=> {
          this.userData = res;
          this.nomUser = this.userData.nom_user;
          this.prenomUser = this.userData.prenom_user;
          this.presenceUser = this.userData.presence;
          this.idUser = this.userData.id_user;
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

    getAccessBadger() {
    let content = {
      action: 'getAccessBadger'
    }
      this.expressService.postExpress('badger', content).subscribe((res: Auth)=> {
        console.log(res.success);
        this.badgerActive = res.success;
      })
    }

//
}
