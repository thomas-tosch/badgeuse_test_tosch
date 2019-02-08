import { Component, OnInit } from '@angular/core';
import {ExpressService} from "../../services/express.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Auth} from "../../guards/auth";
import swal from "sweetalert2";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id_user;
  userData ={};
  form: FormGroup;

  constructor(private expressService: ExpressService,
              private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder)
  {this.createForm();}

  ngOnInit() {
    // refresh all param when route snapshot paramas change
    this.route.params.subscribe(() => {
      this.id_user = this.route.snapshot.params['id_user'];
      this.getUser();
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      nom_group:['0']
    });
  }

  getUser() {
    this.userService.getDataUser((res)=> {
      this.userData = res;
      this.form.get('nom_group').setValue(res.id_group);
    }, this.id_user);
  }



  onSubmit() {
    let content = {
      action: 'updateGroup',
      id_user: this.id_user,
      id_group: this.form.get('nom_group').value
    };
    this.expressService.postExpress('user', content).subscribe((res: Auth)=> {
      if(res.success) {
        swal('Opération réussie !', res.message, 'success');
      } else {
        swal('Opération échouée !', res.message, 'error');
      }
    })
  }

}
