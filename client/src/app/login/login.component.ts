import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginService} from "../services/login.service";
import {AuthGuard} from "../guards/auth.guard";
import {ExpressService} from "../services/express.service";
import {Auth} from "../guards/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  processing = false;
  formLogin: FormGroup;
  previousUrl;

  constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private expressService: ExpressService,
      private router: Router,
      private authGuard: AuthGuard
  ) {
    this.createForm();
  }

  ngOnInit() {
    // TODO : transformer en fonction de service
    if (this.authGuard.redirectUrl) {
      swal('Authentification requise !', 'Vous devez vous connecter pour accéder à cette page.', 'error');
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  // create the login form
  createForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // disable the form
  disableForm() {
    this.formLogin.controls['username'].disable();
    this.formLogin.controls['password'].disable();
  }

  // enable the form
  enableForm() {
    this.formLogin.controls['username'].enable();
    this.formLogin.controls['password'].enable();
  }

  // when we submit the form
  onLoginSubmit() {
    // the modal swal parameter
    const toast = swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      timer: 3000
    });

    this.processing = true;
    this.disableForm();

    // variable for express
    const content = {
      action: 'tryConnect',
      username: this.formLogin.get('username').value,
      password: this.formLogin.get('password').value
    };
    // express request
    this.expressService.postExpress('login', content).subscribe((resp: Auth ) => {
      if (!resp.success) {
        this.processing = false;
        swal('Connexion échouée', resp.message, 'error');
        this.enableForm();
      } else {
        this.loginService.storeUserData(resp.token, resp.user);

        // the modal success
        toast({
          type: 'success',
          title: 'Authentification réussi !'
        })

        // redirection
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl]);
        } else {
          this.router.navigate(['/userSpace']);
        }
      }
    });
  }


}
