import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../guards/auth';
import {FileUploader} from 'ng2-file-upload';

const URL = 'http://localhost:8080/upload';
// const URL = 'http://10.3.1.53:4500/upload';

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  private domain = 'http://localhost:8080';
  // private domain = 'http://10.3.1.53:4500';

  private maxFileSize = 10 * 1024 * 1024; // 10 MB
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
   * check the File size
   * @param callback
   */
  checkFileSize(callback) {
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileSize':
          const errorMessage = 'La taille du fichier dépasse la taille maximal autorisée. <br> (' + Math.round(item.size / 1024 / 1024) + ' Mb sur ' + this.maxFileSize / 1024 / 1024 + ' Mb autorisé)';
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
      url: URL,
      itemAlias: 'justificatif',
      allowedMimeType: this.allowedMimeType,
      maxFileSize: this.maxFileSize
    });

  }
}
