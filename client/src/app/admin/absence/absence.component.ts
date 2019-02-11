import { Component, OnInit } from '@angular/core';
import { ExpressService } from "../../services/express.service";
import { Auth } from "../../guards/auth";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  absences;
  faDownload = faDownload;
  halfDayName = {
    0: 'La journée',
    1: 'Le matin',
    2: 'L\'aprés midi'
  };

  constructor(private expressService: ExpressService) { }

  ngOnInit() {

    // Call the uss List Absence
    this.getUserListAbsence();

  }

  // get the user  list to db
  getUserListAbsence() {
    this.absences = [];
    const content = {
      action: 'getUserListAbsence'
    };
    this.expressService.postExpress('absence_admin', content).subscribe((res: Auth) => {
      this.absences = res.list;
    });
  }
// TODO : ajouter un modal de validation
  onValidate(ref) {
    this.getUpdateAbsence(ref, 1);
  }

  onRefuse(ref) {
    this.getUpdateAbsence(ref, 0);
  }

  getUpdateAbsence(ref, valide) {
    let valideName = 'validée';
    if (valide === 0) {valideName = 'refusée';}

    const content = {
      action: 'getUpdateAbsence',
      valide: valide,
      ref: ref
    };
    this.expressService.postExpress('absence_admin', content).subscribe((res: Auth) => {
      if (res.success) {
        swal(valideName + ' !', 'L\'absence à été ' + valideName, 'success');
        this.getUserListAbsence();
      } else {
        swal('Oups', 'Votre requète n\'à pue aboutir.', 'error');
      }
    });
  }
}

