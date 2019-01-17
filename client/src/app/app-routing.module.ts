import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./guest/login/login.component";
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from "./guards/no-auth.guard";
import {PersonalSpaceComponent} from "./user/personal-space/personal-space.component";
import {ForgotPassComponent} from "./guest/forgot-pass/forgot-pass.component";
import {NewPassComponent} from "./guest/new-pass/new-pass.component";
import {GraphComponent} from "./admin/graph/graph.component";
import {UserDetailComponent} from "./admin/user-detail/user-detail.component";

// ROUTER
const routes: Routes = [
  { path: 'newPass/:id_user/:key', component: NewPassComponent, canActivate: [NotAuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'graph', pathMatch: 'full' },
      { path: 'graph', component: GraphComponent, canActivate: [AuthGuard] },
      { path: 'userDetail/:id_user', component: UserDetailComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'userSpace', component: PersonalSpaceComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'forgotPass', component: ForgotPassComponent, canActivate: [NotAuthGuard] },
  { path: '', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
