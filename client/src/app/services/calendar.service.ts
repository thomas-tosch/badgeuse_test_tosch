import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../guards/auth";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private domain = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  postExpress(target, contentPost) {
    return this.http.post<Auth>(this.domain + '/' + target, contentPost);
  }
}
