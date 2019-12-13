import { Subject, Observable, ReplaySubject, BehaviorSubject } from "rxjs";
import { IUser } from "../models/IUser";
import { Injectable } from "@angular/core";
import { EmployeeType } from "../models/employeeType";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { UserDetail } from "../models/userDetail";
@Injectable()
export class UserService {

    readonly login = 'api/Auth/login';

    constructor(private httpClient: HttpClient) {
        if (this.userList.length == 0) {
            this.userList.push(this.getAdmin());
        }
    }

    public userSubject = new BehaviorSubject<UserDetail>(null);
    private userListSubject = new Subject<IUser[]>();
    private userList: IUser[] = [];

    addUser(user: IUser) {
        this.userList.push(user);
        this.userListSubject.next(this.userList.slice());
    }

    getUser(): Observable<UserDetail> {
        return this.userSubject.asObservable();
    }
    getsubject(): Observable<UserDetail> {
        return this.userSubject;
    }
    getAdmin(): IUser {
        let user = <IUser>{};
        user.userName = "HMHNAdmin";
        user.password = "Admin@1234";
        user.userType = EmployeeType.Admin;
        user.userId = 1;
        return user;
    }

    checkUser(userName: string, password: string): Observable<any> {
        let headersObj = new HttpHeaders({ 'Content-Type': 'application/json' });
        var userLogin = <UserLogin>{}
        userLogin.password = password;
        userLogin.username = userName;
        const url = `${this.login}`;
        return this.httpClient.post(url, userLogin, { headers: headersObj, observe: "response" }).pipe(
            map((p) => this.extractData2(p)),
            tap(data => {
                localStorage.setItem('token', data.token);
                this.userSubject.next(data);
            }),
            catchError(this.handleError));

        //return this.userList.filter(a => a.userName == userName && a.password == password).length > 0
    }

    private extractData2(response: HttpResponse<any>) {
        let body = response.body;
        return body || {};
    }

    private handleError(error: HttpResponse<any>): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.body || 'Server error');
    }
}

export interface UserLogin {
    username: string,
    password: string
}