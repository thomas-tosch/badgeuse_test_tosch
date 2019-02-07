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
  public allowedMimeType = ['image/png', 'image/jpg', 'application/pdf', 'image/jpeg'];

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
   * upload a file to express
   */
  uploadFile() {
    this.uploader = new FileUploader({url: URL, itemAlias: 'justificatif', allowedMimeType: this.allowedMimeType});
  }
}
