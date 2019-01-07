import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from "../services/login.service";


@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {

  constructor(
      private loginService: LoginService,
      private router: Router
  ) { }

  canActivate() {
    if (this.loginService.loggedIn()) {
      this.router.navigate(['/userspace']);
      return false;
    } else {
      return true;
    }
  }
}
