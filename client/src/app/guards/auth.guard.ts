import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {LoginService} from "../services/login.service";


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate (router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.loginService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['login']);
    }
  }
}
