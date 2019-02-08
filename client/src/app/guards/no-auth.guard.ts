import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from '../services/login.service';


@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {

  constructor(
      private loginService: LoginService,
      private router: Router
  ) { }

  /**
   * when user is connected, redirect to Home page
   */
  canActivate() {
    if (this.loginService.loggedIn()) {
      this.router.navigate(['/userSpace']);
      return false;
    } else {
      return true;
    }
  }
}
