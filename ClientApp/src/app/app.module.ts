import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


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
    PersonaldetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: SignInComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'register', component: RegistrationComponent },
    ])
  ],
  providers: [
    UserService,
    AuthAdminGuard,
    AuthAnganwadiGuard,
    AuthMotherGuard,
    AuthDoctorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
