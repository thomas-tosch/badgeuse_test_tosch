import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthGuard} from "../../guards/auth.guard";
import {Auth} from "../../guards/auth";
import swal from "sweetalert2";
import {ExpressService} from "../../services/express.service";

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css', '../../../assets/css/base.guest.css']
})
export class NewPassComponent implements OnInit {

  message;
  processing = false;
  form: FormGroup;
  previousUrl;
  accesNewPass = false;

  constructor(
      private expressService: ExpressService,
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private userService: UserService,
      private router: Router,
      private authGuard: AuthGuard,
      private route: ActivatedRoute
  ) {
    this.createForm();
    this.verifAcces();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      newPass: ['', Validators.required],
      confPass: ['', Validators.required]
    });
  }

  // check if the guest is authorized
  verifAcces(){
    let id_user  = this.route.snapshot.params['id_user'];
    let keyTemp = this.route.snapshot.params['key'];

    const contentPost = {
      accesNewPass: this.accesNewPass,
      idUser: id_user,
      keyTemp: keyTemp
    };
    this.expressService.postExpress("newPass", contentPost).subscribe((resp: Auth) => {
      if (!resp.success) {
        this.message = resp.message;
        swal('Accès non autorisé', this.message, 'error');
        this.router.navigate(['/login']);
        return false;
      } else {
        this.accesNewPass = true;
      }
    });
  }

  disableForm() {
    this.form.controls['newPass'].disable();
    this.form.controls['confPass'].disable();
  }

  enableForm() {
    this.form.controls['newPass'].enable();
    this.form.controls['confPass'].enable();
  }

  comparePass() {
    let newPass = this.form.get('newPass').value.trim();
    let confPass = this.form.get('confPass').value.trim();

    return UserService.comparePass(newPass, confPass);
  }

  validPass() {
    return UserService.validPass(this.form.get('newPass').value.trim());
  }

  // submit the new pass to backend
  onNewPassSubmit() {
    this.processing = true;
    this.disableForm();
    const passwords = {
      accesNewPass: this.accesNewPass,
      idUser: this.route.snapshot.params['id_user'],
      newPass: this.form.get('newPass').value,
      confPass: this.form.get('confPass').value
    };
    this.expressService.postExpress("newPass", passwords).subscribe((resp: Auth) => {
      if (!resp.success) {
        this.message = resp.message;
        this.processing = false;
        swal('Réinitialisation échouée', this.message, 'error');
        this.enableForm();
      } else {
        this.message = resp.message;
        swal('Réinitialisation réussie', this.message, 'success');
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

}
