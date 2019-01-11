import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "./guards/auth.guard";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './guest/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import {LoginService} from "./services/login.service";
import {ExpressService} from "./services/express.service";
import {UserService} from "./services/user.service";
import {ReactiveFormsModule} from "@angular/forms";
import { BadgerComponent } from './menu/badger/badger.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BadgerService} from "./services/badger.service";
import { ProfilComponent } from './user/profil/profil.component';
import { PersonalSpaceComponent } from './user/personal-space/personal-space.component';
import { ForgotPassComponent } from './guest/forgot-pass/forgot-pass.component';
import { NewPassComponent } from './guest/new-pass/new-pass.component';
import { GraphComponent } from './admin/graph/graph.component';
import { ListeComponent } from './admin/liste/liste.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    BadgerComponent,
    ProfilComponent,
    PersonalSpaceComponent,
    ForgotPassComponent,
    NewPassComponent,
    GraphComponent,
    ListeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
      AuthGuard,
      LoginService,
      ExpressService,
      UserService,
      BadgerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
