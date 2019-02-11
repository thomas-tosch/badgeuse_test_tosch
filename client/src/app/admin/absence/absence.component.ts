import { Component, OnInit } from '@angular/core';
import { ExpressService } from "../../services/express.service";
import { Auth } from "../../guards/auth";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  absences: string;
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
    const content = {
      action: 'getUserListAbsence'
    };
    this.expressService.postExpress('absence_admin', content).subscribe((res: Auth) => {
      this.absences = res.list;
    });
  }
}

