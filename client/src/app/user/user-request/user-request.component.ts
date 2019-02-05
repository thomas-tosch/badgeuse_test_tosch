import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpressService} from "../../services/express.service";
import swal from "sweetalert2";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Auth} from 'src/app/guards/auth';

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
    reasonList;

    constructor(private formBuilder: FormBuilder,
                private expressService: ExpressService)
    {
    this.createForm();
    }


    ngOnInit() {

    }

    getReason() {
        let content = {
            action: 'getReason'
        };
        this.expressService.postExpress('absence', content).subscribe((res:Auth) => {
            if(res.success) {
                // console.log(res.list);
                this.reasonList = res.list;
            } else {
                swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
            }
        })
    }

    onJustifiedPeriod() {
        this.justifiedPeriod = !this.justifiedPeriod;
        if(!this.justifiedPeriod) {
            this.userRequest.get('startDate').clearValidators();
            this.userRequest.get('startDate').updateValueAndValidity();
            this.userRequest.get('startDate').setValue(null);
            this.userRequest.get('endDate').clearValidators();
            this.userRequest.get('endDate').updateValueAndValidity();
            this.userRequest.get('endDate').setValue(null);
            this.userRequest.get('dateOnly').setValidators([Validators.required]);
            this.userRequest.get('dateOnly').updateValueAndValidity();
        } else {
            this.userRequest.get('startDate').setValidators([Validators.required]);
            this.userRequest.get('startDate').updateValueAndValidity();
            this.userRequest.get('endDate').setValidators([Validators.required]);
            this.userRequest.get('endDate').updateValueAndValidity();
            this.userRequest.get('dateOnly').clearValidators();
            this.userRequest.get('dateOnly').updateValueAndValidity();
            this.userRequest.get('dateOnly').setValue(null);
        }
    }

    createForm() {
        this.userRequest = this.formBuilder.group({
            reason: [0, Validators.required],
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],
            dateOnly: [null],
            halfDay: [null],
            comment: ['']
        });
        this.getReason();
    }

    disableForm() {
        this.userRequest.controls['reason'].disable();
        this.userRequest.controls['startDate'].disable();
        this.userRequest.controls['endDate'].disable();
        this.userRequest.controls['dateOnly'].disable();
        this.userRequest.controls['halfDay'].disable();
        this.userRequest.controls['comment'].disable();

    }

    enableForm() {
        this.userRequest.controls['reason'].enable();
        this.userRequest.controls['startDate'].enable();
        this.userRequest.controls['endDate'].enable();
        this.userRequest.controls['dateOnly'].enable();
        this.userRequest.controls['halfDay'].enable();
        this.userRequest.controls['comment'].enable();

    }

    onRequestSubmit() {

        let content = {
            action: 'absenceRequest',
            reason: this.userRequest.get('reason').value,
            startDate: this.userRequest.get('startDate').value,
            endDate: this.userRequest.get('endDate').value,
            dateOnly: this.userRequest.get('dateOnly').value,
            halfDay: this.userRequest.get('halfDay').value,
            comment: this.userRequest.get('comment').value
        };
        console.log(content);
        this.expressService.postExpress('absence', content).subscribe((res:Auth)=> {
           console.log(res.success);
        });
    };


}
