import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../guards/auth";

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  private domain = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) { }

  // post request to express and get the response
  postExpress(target, contentPost) {
    return this.http.post<Auth>(this.domain + '/' + target, contentPost);
  }
}
