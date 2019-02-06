import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../guards/auth';
import {FileUploader} from 'ng2-file-upload';

const URL = 'http://localhost:8080/upload';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  private domain = 'http://localhost:8080';
  public uploader: FileUploader;

  constructor(private http: HttpClient) { }

  /**
   * post request to express and get the response
   * @param target
   * @param contentPost
   */
  postExpress(target, contentPost) {
    return this.http.post<Auth>(this.domain + '/' + target, contentPost);
  }

  /**
   * upload a file to express
   * @param fileName
   */
  uploadFile(fileName) {
    this.uploader = new FileUploader({url: URL, itemAlias: 'justificatif'});

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      const fileExtension = '.' + file.file.name.split('.').pop();
      file.file.name = fileName + fileExtension;
    };
  }
}
