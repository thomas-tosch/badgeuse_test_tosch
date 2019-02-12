import { Injectable } from '@angular/core';
import {ExpressService} from "./express.service";
import {Auth} from "../guards/auth";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  nbAbsence = 0;
  public nbAbsenceSubject = new Subject<Number>();

  constructor(private expressService: ExpressService) { }

  /**
   * get the user  list to db
   */
  getUserListAbsence(callback) {
    const content = {
      action: 'getUserListAbsence'
    };
    this.expressService.postExpress('absence_admin', content).subscribe((res: Auth) => {
      return callback(res.list);
    });
  }

  emitNbAbsenceSubject() {
    this.getUserListAbsence((res) => {
      this.nbAbsenceSubject.next(res.length);
    })

  }
}
