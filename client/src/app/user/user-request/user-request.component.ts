import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpressService} from '../../services/express.service';
import swal from 'sweetalert2';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {Auth} from 'src/app/guards/auth';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {

    // TODO : faire des dossiers à l'année pour les fichiers. lancé une petite fonction qui vérifie si le dossier existe bien sinon il le crée
    // TODO : limité les extention de fichier, seul les format jpg, png et pdf seront autorisés

    userRequest: FormGroup;
    processing = false;
    faInfoCircle = faInfoCircle;
    justifiedPeriod = true;
    reasonList;
    id_user;
    endDateMin;
    countLetter = 0;
    uploader;
    fileName;
    reason;
    cssButton = '';

    constructor(private formBuilder: FormBuilder,
                private expressService: ExpressService,
                private userService: UserService) {
        this.createForm();
        }

    ngOnInit() {
        this.getIdUser();
        this.expressService.uploadFile();
        this.uploader = this.expressService.uploader;
    }




    /**
     * get the id of user connected
     */
    getIdUser() {
        this.userService.getIdUser((id) => {
            this.id_user = id;
        });
    }

    /**
     * get all reason for the selectBox
     */
    getReason() {
        const content = {
            action: 'getReason'
        };
        this.expressService.postExpress('absence', content).subscribe((res: Auth) => {
            if (res.success) {
                this.reasonList = res.list;
            } else {
                swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
            }
        });
    }

    /**
     * change the require attribute for date input when other toggle is selected
     */
    onJustifiedPeriod() {
        this.justifiedPeriod = !this.justifiedPeriod;
        if (!this.justifiedPeriod) {
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

    /**
     * build the formular
     */
    createForm() {
        this.userRequest = this.formBuilder.group({
            reason: [0, Validators.required],
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],
            dateOnly: [null],
            halfDay: [null],
            comment: [null]
        });
        this.getReason();
    }

    /**
     * disable all input in form
     */
    disableForm() {
        this.userRequest.controls['reason'].disable();
        this.userRequest.controls['startDate'].disable();
        this.userRequest.controls['endDate'].disable();
        this.userRequest.controls['dateOnly'].disable();
        this.userRequest.controls['halfDay'].disable();
        this.userRequest.controls['comment'].disable();

    }

    /**
     * enable all input in form
     */
    enableForm() {
        this.userRequest.controls['reason'].enable();
        this.userRequest.controls['startDate'].enable();
        this.userRequest.controls['endDate'].enable();
        this.userRequest.controls['dateOnly'].enable();
        this.userRequest.controls['halfDay'].enable();
        this.userRequest.controls['comment'].enable();
    }

    /**
     * reset the form
     */
    resetForm() {
        this.enableForm();
        this.processing = false;
        this.userRequest.controls['reason'].setValue(0);
        this.userRequest.controls['startDate'].setValue(null);
        this.userRequest.controls['endDate'].setValue(null);
        this.userRequest.controls['dateOnly'].setValue(null);
        this.userRequest.controls['halfDay'].setValue(null);
        this.userRequest.controls['comment'].setValue(null);
        $('#justifFormControlFile1').val('');
    }

    /**
     * limit the date picker for input endDate
     */
    onStartEndChange() {
        // get the value
        this.endDateMin = this.userRequest.get('startDate').value;
        // add 1 day
        this.endDateMin = new Date(new Date(this.endDateMin).setDate(new Date(this.endDateMin).getDate() + 1)).toISOString();
        // slice on date format
        this.endDateMin = this.endDateMin.slice(0, 10);
        // if startDate >= endDate
        if (this.userRequest.get('startDate').value >= this.userRequest.get('endDate').value) {
            // set endDate > startDate
            this.userRequest.get('endDate').setValue(this.endDateMin);
        }
        if ($('#justifFormControlFile1').val() !== '') {this.getFileName(); }
    }

    /**
     * update file name if onlyDate change
     */
    onDateOnlyChange() {
        if ($('#justifFormControlFile1').val() !== '') {this.getFileName(); }
    }

    /**
     * count the character on comment input
     */
    onCommentChange() {
        this.countLetter = this.userRequest.get('comment').value.length;
    }

    /**
     * define and set file name
     */
    getFileName() {
        // get data user for his name
        this.userService.getDataUser((user) => {
            const userName = user.nom_user + '_' + user.prenom_user;

            // define the date
            let firstDate;
            if (this.userRequest.get('startDate').value !== null) {firstDate = this.userRequest.get('startDate').value; }
            if (this.userRequest.get('dateOnly').value !== null) {firstDate = this.userRequest.get('dateOnly').value; }
            const currentDate = new Date(firstDate).toISOString().slice(0, 10);

            // define the reason
            this.reason = this.reasonList[this.userRequest.get('reason').value - 1].nom_reason;

            // define the reference
            const content = {action: 'getRefAbsence'};
            this.expressService.postExpress('absence', content).subscribe((res: Auth) => {
                if (res.success) {
                    // define the full fileName
                    this.fileName = userName + '-' + currentDate + '-[' + this.reason + ']-' + res.list;
                } else {
                    swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                }
            });
        });
    }

    /**
     * show the confirm modal
     */
    toConfirmModal() {
        this.cssButton = 'progress-bar progress-bar-striped progress-bar-animated';
        this.processing = true;
        this.disableForm();

        // define the period or the day
        let periode = 'La période du : ' + this.userRequest.get('startDate').value + ' au ' + this.userRequest.get('endDate').value;
        if (this.userRequest.get('dateOnly').value !== null) {
            let halfday = 'journée';
            if (this.userRequest.get('halfDay').value === true) {halfday = 'demi-journée';}
            periode = 'La ' + halfday + ' du :' + this.userRequest.get('dateOnly').value;
        }

        // define the comment
        let comment = this.userRequest.get('comment').value;
        if (comment === null) {comment = 'Aucun commentaire';}

        // show the modal
        swal({
            title: 'Confirmez votre justification',
            html: "<u>Est-ce que les informations que vous avez saisie sont juste? </u><br><br>" +
                "<div class='text-left ml-4'>" +
                "La raison: " + this.reasonList[this.userRequest.get('reason').value - 1].nom_reason + "<br>" +
                periode + "<br>" +
                "Commentaire: " + comment + "" +
                "</div>",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, les informations sont justes',
            cancelButtonText: 'Non',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {

                // then the student confirm, do the request to backend
                this.onRequestSubmit();
            } else {

                // then the student cancel
                this.enableForm();
                this.processing = false;
                this.cssButton = '';
            }
        });
    }

    /**
     * on submit action, send the data to backend
     */
    onRequestSubmit() {
        const content = {
            action: 'absenceRequest',
            id_user: this.id_user,
            reason: this.userRequest.get('reason').value,
            startDate: this.userRequest.get('startDate').value,
            endDate: this.userRequest.get('endDate').value,
            dateOnly: this.userRequest.get('dateOnly').value,
            halfDay: this.userRequest.get('halfDay').value,
            comment: this.userRequest.get('comment').value
        };
        this.expressService.postExpress('absence', content).subscribe((res: Auth) => {
            if (res.success) {

                // if a file selected
                if (this.uploader.getNotUploadedItems().length) {

                    // set the file name
                    this.uploader.onBeforeUploadItem = (item) => {
                        item.withCredentials = false;
                        const fileExtension = '.' + item.file.name.split('.').pop();
                        item.file.name = this.fileName + fileExtension;
                    };

                    // upload the file
                    this.uploader.uploadAll();

                    // response uploaded file
                    this.uploader.onCompleteItem = (item: any) => {
                        if (item.isSuccess) {
                            swal('Opération réussie', res.message, 'success');
                            setTimeout(() => {
                                this.resetForm();
                                this.cssButton = '';
                            }, 2000);
                        }
                        if (item.isError || item.isCancel) {
                            swal('Opération échouée', 'Le fichier n\'à pas été télécharger', 'error');
                        }
                    };
                } else {
                    swal('Opération réussie', res.message, 'success');
                    setTimeout(() => {
                        this.resetForm();
                        this.cssButton = '';
                    }, 2000);
                }
            } else {
                swal('Opération échouée', res.message, 'error');
                this.enableForm();
                this.processing = false;
                this.cssButton = '';
            }
        });
    }
}
