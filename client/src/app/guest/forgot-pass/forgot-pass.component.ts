import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import swal from "sweetalert2";
import {Auth} from "../../guards/auth";
import {ExpressService} from "../../services/express.service";

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css', '../../../assets/css/base.guest.css']
})
export class ForgotPassComponent implements OnInit {

  message;
  processing = false;
  form: FormGroup;
  previousUrl;

  constructor(
      private expressService: ExpressService,
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private userService: UserService,
      private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loginService.logout();
  }

  createForm() {
    this.form = this.formBuilder.group({
      mail: ['', Validators.required]
    });
  }

  mailValids(){
    return UserService.mailValidate(this.form.get('mail').value);
  }

  disableForm() {
    this.form.controls['mail'].disable();
  }

  enableForm() {
    this.form.controls['mail'].enable();
  }

  onResetPassSubmit() {
    this.processing = true;
    this.disableForm();
    const mails = {
      action: 'reqForgotPass',
      mail: this.form.get('mail').value
    };

    this.expressService.postExpress("login", mails).subscribe((resp: Auth ) => {
      if (!resp.success) {
        this.message = resp.message;
        this.processing = false;
        swal('Demande échouée', this.message, 'error');
        this.enableForm();
      } else {
        this.message = resp.message;
        swal('Demande réussie', this.message, 'success');
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['']);
          }
        }, 2000);
      }

    });
  }

}
