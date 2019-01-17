import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {Auth} from "../../guards/auth";
import {faCircle, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {Observable, Observer} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  userList;
  userOn = [];
  userOff = [];

  faCircle = faCircle
  students = 1;

  constructor(private expressService: ExpressService) { }

  ngOnInit() {
    this.getUserList();
    this.testObservable();
  }

  getUserList() {
    let content = {
      action: 'getUserList'
    };
    this.expressService.postExpress('liste', content).subscribe((res: Auth) => {
      this.userList = res.list;
      this.splitPresence();
    })
  }

  splitPresence() {
    this.userList.forEach((user) => {
      if(user.presence === 1) {
        this.userOn.push(user);
      } else {
        this.userOff.push(user);
      }
    })
  }

  onRefresh() {
    this.userList = [];
    this.userOn = [];
    this.userOff = [];
    this.getUserList();
  }

  testObservable() {

    const studentsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.students);
      }, 2000);
    });

    studentsObservable.subscribe((studentsData) => {
      // this.students = studentsData;
      console.log(studentsData);
    });

  }

  onTest() {

  }


}
