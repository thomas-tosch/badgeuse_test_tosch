import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../guards/auth';
import {FileUploader} from 'ng2-file-upload';
import {LoginService} from "./login.service";



@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  /**
   * Define the backend port
   */
  private port = '8080';
  private domain;
  private URL;
  private maxFileSize = 10 * 1024 * 1024; // 10 MB
  public uploader: FileUploader;
  public allowedMimeType = ['image/png', 'image/jpg', 'application/pdf', 'image/jpeg'];

  constructor(private http: HttpClient,
              private loginService: LoginService) {
    this.defineUrl();
  }

  /**
   * get windows location url and define this for the request post to backend
   */
  defineUrl() {
    let url = window.location.href;
    const regex = /.*.\/\/.*?\//;
    url = url.match(regex).toString();
    url = url.slice(0, -1);
    const regex2 = /(.{6}):/;
    if(url.match(regex2)){
      url = url.match(/.*:/).toString();
      url = url.slice(0, -1);
    };
    this.domain = url + ':' + this.port;
    this.URL = url + ':' + this.port + '/upload';
  }

  getDomain() {
      return this.domain;
  }

  /**
   * post request to express and get the response
   * @param target
   * @param contentPost
   */
  postExpress(target, contentPost) {
    contentPost.token = this.loginService.getToken();
    return this.http.post<Auth>(this.domain + '/' + target, contentPost);
  }

  /**
   * set the name of file before upload
   * @param fileName
   */
  setFileName(fileName) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      const fileExtension = '.' + item.file.name.split('.').pop();
      item.file.name = fileName + fileExtension;
    };
  }

  /**
   * check the File size
   * @param callback
   */
  checkFileSize(callback) {
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileSize':
          const errorMessage = 'La taille du fichier dépasse la taille maximale autorisée. <br> (' + Math.round(item.size / 1024 / 1024) + ' Mb sur ' + this.maxFileSize / 1024 / 1024 + ' Mb autorisé)';
          console.log(errorMessage);
          return callback(errorMessage);
          break;
      }
    };
  }

  /**
   * upload a file to express
   */
  uploadFile() {
    this.uploader = new FileUploader({
      url: this.URL,
      itemAlias: 'justificatif',
      allowedMimeType: this.allowedMimeType,
      maxFileSize: this.maxFileSize
    });

  }
}
