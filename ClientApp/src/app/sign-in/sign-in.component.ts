import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        console.log(this.router.url);

        this.loading = true;
        this.userService.checkUser(this.loginForm.value.UserName, this.loginForm.value.Password).subscribe((result: any) => {
            console.log(result)
        })
        if (true) {
            this.loading = false;
            this.errorOccured = false;
            // this.router.navigate(['/dashboard']);
        } else {
            this.loading = false;
            this.errorOccured = true;
        }

        // this.userService.loginUser(this.loginForm.value).subscribe((data: any) => {
        //     localStorage.setItem('userToken', data.tokenString);
        //     if (this.router.url.indexOf('returnUrl') > 1) {
        //         this.router.navigate(['/' + this.router.url.split('%2F')[1] + '']);
        //     } else {
        //         this.router.navigate(['/home']);
        //     }

        // }, (error) => {
        //     console.log(error);
        //     });
    }
}