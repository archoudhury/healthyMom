import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetail } from './models/userDetail';
import { UserService } from './services/user.service';
import { EmployeeType } from './models/employeeType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private service: UserService) {

  }
  title = 'app';
  ngOnDestroy() {

  }
  ngOnInit() {
    this.getTokenDetails();
    // this.getDecodedAccessToken();
  }
  // getDecodedAccessToken(): any {
  //   try {
  //     var token = localStorage.getItem('token')
  //     var details = jwt_decode(token);
  //     return null
  //   }
  //   catch (Error) {
  //     return null;
  //   }
  // }

  getTokenDetails() {
    var token = localStorage.getItem('token')

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);

    // Other functions
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    if (!isExpired) {
      var user = <UserDetail>{};
      var userType = EmployeeType;
      user.role = +userType[decodedToken.userType]; //EmployeeType.Mother. decodedToken.userType;
      user.token = token;
      user.userName = decodedToken.sub;
      user.id = +decodedToken.userId;
      this.service.userSubject.next(user);
    } else {
      this.service.loggedOut();
    }
  }
}




