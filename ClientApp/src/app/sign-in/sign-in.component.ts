import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { EmployeeType } from '../models/employeeType';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    public user: any;
    loginForm: FormGroup;
    loading = false;
    errorOccured: boolean = false;
    submitted = false;
    private subs = new SubSink();
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            UserName: ['', Validators.required],
            Password: ['', [Validators.required, Validators.minLength(5)]]
        });

        this.subs.sink = this.userService.getErrorMessage().subscribe((error: any) => {
            if (error != null && error.error != '') {
                this.errorOccured = true;
                this.loading = false;
            }
            console.log(error);
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        console.log(this.router.url);

        this.loading = true;
        this.userService.checkUser(this.loginForm.value.UserName, this.loginForm.value.Password).subscribe((result: any) => {
            console.log(result);
            if (result) {

                switch (result.role) {
                    case EmployeeType.Doctor:
                        this.router.navigate(['/dashboard']);
                        break;
                    case EmployeeType.Anganwadi:
                        this.router.navigate(['/anganwadi/appointment']);
                        break;
                    case EmployeeType.Mother:
                        this.router.navigate(['/todo']);
                        break;
                    default:
                        this.router.navigate(['/']);
                        break;
                }
            }
        },
            catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error.message || "server error.");
    }
}