import {ExpressService} from "../services/express.service";

import { Component, OnInit } from '@angular/core';
import {faAddressCard, faBell, faChessQueen, faTimesCircle, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
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
  faTimesCircle = faTimesCircle;
  faBell = faBell;
  userData;
  nomUser;
  prenomUser;
  presenceUser;
  idUser;
  badgerActive;
  adminActive = false;
  alerteActive = false;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private router: Router,
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
          this.getAlerte();
          // activate administrator access if role = 3
          if(res.id_role === 3){
              this.adminActive = true;
          }
        });
    }

    // logOut the user
    onDisconnect() {
        this.loginService.logout();
        this.router.navigate(['/']);
    }

    getAlerte(){

    let content = {action : 'getDataAlerte', id_user:this.idUser} ;
    this.expressService.postExpress('alerte', content).subscribe((res:Auth)=>{
      if (res.success){
        this.alerteActive=true;
      }
    })

    }

    // check if the client is in UHA 4.0 area
    getAccessBadger() {
    let content = {
      action: 'getAccessBadger'
    }
      this.expressService.postExpress('badger', content).subscribe((res: Auth)=> {
        this.badgerActive = res.success;
      })
    }



}
