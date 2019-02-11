import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ExpressService } from "../../services/express.service";
import { Auth } from "../../guards/auth";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import swal from "sweetalert2";

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  absences;

  constructor(private expressService: ExpressService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {

    // Call the uss List Absence
    this.getUserListAbsence();

  }

  // get the user  list to db
  getUserListAbsence() {
    let content = {
      action: 'getUserListAbsence'
    };
    this.expressService.postExpress('absence', content).subscribe((res: Auth) => {
      console.log(res.list);
      this.absences = res.list;
    })
  }
}
