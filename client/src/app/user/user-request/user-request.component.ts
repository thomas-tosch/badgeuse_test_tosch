import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {ExpressService} from "../../services/express.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../../guards/auth.guard";
import swal from "sweetalert2";

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {

  userRequest: FormGroup;
  processing = false;

  constructor(private formBuilder: FormBuilder,)
  {
    this.createForm();
  }


  ngOnInit() {

  }



  createForm() {
    this.userRequest = this.formBuilder.group({
      Motif: ['', Validators.required],
      DateDebut: ['', Validators.required],
      DateFin: ['', Validators.required],
      comment: ['', Validators.required]

    });
  }

  disableForm() {
    this.userRequest.controls['Motif'].disable();
    this.userRequest.controls['DateDebut'].disable();
    this.userRequest.controls['DateFin'].disable();
    this.userRequest.controls['comment'].disable();

  }

  enableForm() {
    this.userRequest.controls['Motif'].enable();
    this.userRequest.controls['DateDebut'].enable();
    this.userRequest.controls['DateFin'].enable();
    this.userRequest.controls['comment'].enable();

  }

   onRequestSubmit() {

    //console.log(this.userRequest.get('Motif').value);
   /* const toast = swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: true;
      timer: 3000
    });

    this.processing = true;
    this.disableForm();
*/

    console.log(
      this.userRequest.get('Motif').value,
      this.userRequest.get('DateDebut').value,
      this.userRequest.get('DateFin').value,
      this.userRequest.get('comment').value)
    };

    // TODO gerrer le pacourrir justificatif, vérifier onValidation différence avec onLoginSubmit (BDD?) mettre type inputDate


}
