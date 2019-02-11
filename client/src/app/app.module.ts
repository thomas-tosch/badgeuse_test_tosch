import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './guest/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { LoginService} from './services/login.service';
import { ExpressService} from './services/express.service';
import { UserService} from './services/user.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BadgerComponent } from './menu/badger/badger.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BadgerService} from './services/badger.service';
import { PersonalSpaceComponent } from './user/personal-space/personal-space.component';
import { GraphComponent } from './admin/graph/graph.component';
import { ListeComponent } from './menu/liste/liste.component';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { HebdoComponent } from './admin/hebdo/hebdo.component';
import { MonthlyCalendarComponent } from './user/monthly-calendar/monthly-calendar.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { Error404Component } from './guest/error404/error404.component';
import { AbsenceComponent } from './admin/absence/absence.component';
import { UserRequestComponent } from './user/user-request/user-request.component';
import { WebsocketService } from './services/websocket.Service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FileSelectDirective } from 'ng2-file-upload';
import { ReplaceSpace } from './pipe/replaceSpace';
import { HTMLEscapeUnescapeModule } from "html-escape-unescape";
import {TruncatePipe} from "./pipe/truncate";


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    BadgerComponent,
    PersonalSpaceComponent,
    GraphComponent,
    ListeComponent,
    UserDetailComponent,
    HebdoComponent,
    MonthlyCalendarComponent,
    Error404Component,
    UserRequestComponent,
    FileSelectDirective,
    AbsenceComponent,
    ReplaceSpace,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    OrderModule,
    ChartsModule,
    FormsModule,
    BrowserModule,
    FullCalendarModule,
      HTMLEscapeUnescapeModule
  ],
  providers: [
      AuthGuard,
      LoginService,
      ExpressService,
      UserService,
      BadgerService,
      WebsocketService,
      { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
