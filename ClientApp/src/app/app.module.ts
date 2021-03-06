import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgOtpInputModule } from  'ng-otp-input';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { HistoryComponent } from './history/history.component';
import { ToDoComponent } from './todo/todocomponent';
import { PersonaldetailComponent } from './personal-detail/personaldetail.component';
import { AuthAdminGuard } from './security/gaurds/admin.gaurd';
import { AuthAnganwadiGuard } from './security/gaurds/anganwadi.gaurd';
import { AuthMotherGuard } from './security/gaurds/mother.gaurd';
import { AuthDoctorGuard } from './security/gaurds/doctor.gaurd';
import { AnganwadiComponent } from './anganwadi/anganwadi.component';
import { NotFoundComponent } from './not-found/notfound.component';
import { SignUpComponent } from './sign-up/signup.component';
import { UtilityService } from './services/utility';
import { PregnencyTipsComponent } from './pregnencytips/pregnencytips.component';
import { AppintmentType } from './shared/pipes/AppintmentType.pipe';
import { CounterDirective } from './shared/directives/countdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SignInComponent,
    RegistrationComponent,
    DashboardComponent,
    HistoryComponent,
    ToDoComponent,
    PersonaldetailComponent,
    AnganwadiComponent,
    NotFoundComponent,
    SignUpComponent,
    PregnencyTipsComponent,
    AppintmentType,
    CounterDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    NgOtpInputModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },      
      { path: 'dashboard',canActivate:[AuthDoctorGuard], component: DashboardComponent },
      { path: 'register', canActivate:[AuthDoctorGuard], component: RegistrationComponent },
      { path: 'history', canActivate:[AuthMotherGuard], component: RegistrationComponent },
      { path: 'todo',  canActivate:[AuthMotherGuard], component: ToDoComponent },
      { path: 'detail',canActivate:[AuthMotherGuard], component: PersonaldetailComponent },
      { path: 'anganwadi/appointment', canActivate:[AuthAnganwadiGuard], component: AnganwadiComponent },
      { path: 'update', canActivate:[AuthDoctorGuard], component: RegistrationComponent },
      { path: 'not-found', component: NotFoundComponent },
      {path: 'PregnencyTips', canActivate:[AuthMotherGuard], component: PregnencyTipsComponent},
      { path: '**', redirectTo: 'not-found' }
    ])
  ],
  providers: [
    UserService,
    AuthAdminGuard,
    AuthAnganwadiGuard,
    AuthMotherGuard,
    AuthDoctorGuard,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
