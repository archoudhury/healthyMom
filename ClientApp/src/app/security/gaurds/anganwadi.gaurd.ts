import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetail } from '../../models/userDetail';
import { EmployeeType } from '../../models/employeeType';

@Injectable()
export class AuthAnganwadiGuard implements CanActivate {

    private isAuthenticated: boolean = false;
    constructor(private router: Router, private service: UserService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.service.getsubject().subscribe(((data: UserDetail) => {
            if (data && data.role == EmployeeType.Anganwadi) {
                this.isAuthenticated = true;
                return true;
            }
            else {
                this.isAuthenticated = false;
                this.router.navigate(['/login']);
                return false;
            }
        })).unsubscribe();


        // ((res: UserDetail) => {
        //     if (res && res.token != "" && res.role == 1) {
        //         // not logged in so redirect to login page
        //         this.isAuthenticated = true;
        //         this.router.navigate(['/dashboard']);
        //         return true;
        //     } else {
        //         this.isAuthenticated = false;
        //         // not logged in so redirect to login page with the return url
        //         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     }

        // })
        return this.isAuthenticated;
    }
}