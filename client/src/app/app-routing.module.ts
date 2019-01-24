import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./guest/login/login.component";
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from "./guards/no-auth.guard";
import {PersonalSpaceComponent} from "./user/personal-space/personal-space.component";
import {ForgotPassComponent} from "./guest/forgot-pass/forgot-pass.component";
import {NewPassComponent} from "./guest/new-pass/new-pass.component";
import {UserDetailComponent} from "./admin/user-detail/user-detail.component";
import {HebdoComponent} from "./admin/hebdo/hebdo.component";

// ROUTER
const routes: Routes = [
  // admin
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'hebdo', component: HebdoComponent, canActivate: [AuthGuard] },
  { path: 'userDetail/:id_user', component: UserDetailComponent, canActivate: [AuthGuard] },
  // user
  { path: 'userSpace', component: PersonalSpaceComponent, canActivate: [AuthGuard]},
  // guest
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'newPass/:id_user/:key', component: NewPassComponent, canActivate: [NotAuthGuard] },
  { path: 'forgotPass', component: ForgotPassComponent, canActivate: [NotAuthGuard] },
  // other
  { path: '', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
