import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {ExpressService} from "../../services/express.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../../guards/auth.guard";
import swal from "sweetalert2";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {

    userRequest: FormGroup;
    processing = false;
    faInfoCircle = faInfoCircle;
    justifiedPeriod = true;

    constructor(private formBuilder: FormBuilder,)
    {
    this.createForm();
    }


    ngOnInit() {

    }

    onJustifiedPeriod() {
        this.justifiedPeriod = !this.justifiedPeriod;
        if(!this.justifiedPeriod) {
            this.userRequest.get('dateDebut').clearValidators();
            this.userRequest.get('dateDebut').updateValueAndValidity();
            this.userRequest.get('dateDebut').setValue(null);
            this.userRequest.get('dateFin').clearValidators();
            this.userRequest.get('dateFin').updateValueAndValidity();
            this.userRequest.get('dateFin').setValue(null);
            this.userRequest.get('inputDateOnly').setValidators([Validators.required]);
            this.userRequest.get('inputDateOnly').updateValueAndValidity();
        } else {
            this.userRequest.get('dateDebut').setValidators([Validators.required]);
            this.userRequest.get('dateDebut').updateValueAndValidity();
            this.userRequest.get('dateFin').setValidators([Validators.required]);
            this.userRequest.get('dateFin').updateValueAndValidity();
            this.userRequest.get('inputDateOnly').clearValidators();
            this.userRequest.get('inputDateOnly').updateValueAndValidity();
            this.userRequest.get('inputDateOnly').setValue(null);
        }
    }

    createForm() {
        this.userRequest = this.formBuilder.group({
            reason: ['', Validators.required],
            dateDebut: [null, Validators.required],
            dateFin: [null, Validators.required],
            inputDateOnly: [null],
            checkboxHalfDay: [null],
            comment: ['']
        });
    }

    disableForm() {
        this.userRequest.controls['reason'].disable();
        this.userRequest.controls['dateDebut'].disable();
        this.userRequest.controls['dateFin'].disable();
        this.userRequest.controls['comment'].disable();

    }

    enableForm() {
        this.userRequest.controls['reason'].enable();
        this.userRequest.controls['dateDebut'].enable();
        this.userRequest.controls['dateFin'].enable();
        this.userRequest.controls['comment'].enable();

    }

    onRequestSubmit() {

        let content = {
            reason: this.userRequest.get('reason').value,
            dateDebut: this.userRequest.get('dateDebut').value,
            dateFin: this.userRequest.get('dateFin').value,
            inputDateOnly: this.userRequest.get('inputDateOnly').value,
            checkboxHalfDay: this.userRequest.get('checkboxHalfDay').value,
            comment: this.userRequest.get('comment').value
        };
        console.log(content);
    };

    // TODO gerrer le pacourrir justificatif, vérifier onValidation différence avec onLoginSubmit (BDD?) mettre type inputDate


}
