import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "./guards/auth.guard";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import {LoginService} from "./services/login.service";
import {ExpressService} from "./services/express.service";
import {UserService} from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
      AuthGuard,
      LoginService,
      ExpressService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
