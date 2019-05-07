import { Component, OnInit } from '@angular/core';
import { ExpressService } from '../../services/express.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../guards/auth';
import swal from 'sweetalert2';
import {Chart} from 'chart.js'


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id_user;
  userData;
  form: FormGroup;
  monthActive = 'agendaWeek';
  dateSelected;
  PieChart = [];

  constructor(private expressService: ExpressService,
              private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.createForm();
    this.getPieChart()

  }

  ngOnInit() {
    this.refreshUser();
    this.getPieChart()

  }

  /**
   * refresh all param when route snapshot paramas change
   */
  refreshUser() {
    this.route.params.subscribe(() => {
      this.id_user = this.route.snapshot.params['id_user'];
      this.dateSelected = this.route.snapshot.params['dateSelected'];
      this.getUser();
    });
  }

  /**
   * build the form on group
   */
  createForm() {
    this.form = this.formBuilder.group({
      nom_group: ['0']
    });
  }

  /**
   * get the data of user
   */
  getUser() {
    this.userService.getDataUser((res) => {
      this.userData = res;
      this.form.get('nom_group').setValue(res.id_group);
    }, this.id_user);
  }

  /**
   * Submit the data form to backend
   */
  onSubmit() {
    const content = {
      action: 'updateGroup',
      id_user: this.id_user,
      id_group: this.form.get('nom_group').value
    };
    this.expressService.postExpress('user', content).subscribe((res: Auth) => {
      if (res.success) {
        swal('Opération réussie !', res.message, 'success');
      } else {
        swal('Opération échouée !', res.message, 'error');
      }
    });
  }

  getPieChart() {
    this.userService.getPieChart((dataFromBack, reasonFromBack) => {
      console.log("dataFromBack : " + dataFromBack);
      console.log("reasonFromBack : " + reasonFromBack);
      var nonJustifie = 35;
      dataFromBack.forEach(function (iJustifie){nonJustifie -= iJustifie});
      dataFromBack.push(nonJustifie);
      reasonFromBack.push("Non Justifié");
      this.PieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: reasonFromBack,

          datasets: [{
            label: '# of Votes',
            data: dataFromBack,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          title:{
            text:"Répartitions des heures",
            display:true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    }, this.id_user);
  }

}
