import { Injectable } from '@angular/core';
import {ExpressService} from "./express.service";
import { BehaviorSubject } from 'rxjs';
import {User} from './models/user.model';
import {Auth} from "../guards/auth";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthTokenService} from "./auth-token.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  


@Injectable({
    providedIn: 'root'
})
export class UserService {

    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;
  


    constructor(private authTokenService: AuthTokenService,
                private router: Router,
                private expressService: ExpressService) { }


    get data(): User[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
      }
    
                


    /**
     * get only the id of user
     * @param callback
     * @param userName
     */
    getIdUser(callback, userName?) {
        if (userName === undefined) {
            const token = this.authTokenService.decodeToken();
            return callback(token.id_user);
        } else {
            const content = {
                action: 'getIdUser',
                userName: userName
            };
            this.expressService.postExpress('user', content).subscribe((res: Auth)=> {
                if (!res.success) {
                    swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                } else {
                    return callback(res.user);
                }
            });
        }
    }

    /**
     * get all data of user conected
     * @param callback
     * @param id_user
     */
    getDataUser(callback, id_user?) {
        this.expressService.checkTokenBack((isOk) => {
            if(isOk) {

                const token = this.authTokenService.decodeToken();
                // console.log(token);

                if (token === null) {
                    return callback(false);
                } else {

                    if (id_user === undefined) {
                        id_user = token.id_user;
                    }

                    const content = {
                        action: 'getDataUser',
                        id_user: id_user
                    };
                    this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                        if (!res.success) {
                            swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                        } else {
                            return callback(res.user);
                        }
                    });
                }
            }
        });
    }
    

    // ADD, POST METHOD
    addUser(user: User): void {
        this.httpClient.post(endpoint+ 'customer/', user, httpOptions).subscribe(data => {
          console.log(data);
          this.dialogData = user;
          this.toastr.success('Félicitation, utilisateur ajouté.', 'Success!');
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Problème, aucun utilisateur ajouté.', 'Oops!');
        });
       }

     // UPDATE, PUT METHOD
    updateUser(user: User){
        return this.httpClient.put(endpoint+ 'customer/', user).subscribe(data => {
          console.log(data);
            this.dialogData = user;
            this.toastr.success('Félicitation utilisateur édité', 'Success!');
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Problème, aucun utilisateur modifié: ' + err.name + ' ' + err.message, 'Oops');
          }
        );
      }
    

    // DELETE METHOD
    deleteUser(id: string): void {
        this.httpClient.delete<User[]>(endpoint+ 'customer/' + id).subscribe(data => {
            console.log(data);
        this.toastr.success('Félicitation utilisateur supprimé', 'Success!');
        },
        (err: HttpErrorResponse) => {
        this.toastr.success('Successfully deleted', 'Success!', );
        }
        );
    }


    /**
     * check if the user connected is administrator
     * @param callback
     */
    isUserAdmin(callback) {
        this.getDataUser((user) => {
            // activate administrator access if role = 3
            if (user.id_role === 3){
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }


}
