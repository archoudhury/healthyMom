import { Subject, Observable, ReplaySubject, BehaviorSubject } from "rxjs";
import { IUser } from "../models/IUser";
import { Injectable } from "@angular/core";
import { EmployeeType } from "../models/employeeType";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { UserDetail } from "../models/userDetail";
import { IMotherRegistration } from "../models/IMotherRegistration";
import { IMother } from "../models/IMother";
@Injectable()
export class UserService {


    readonly login = 'api/Auth/login';
    readonly registorMom = 'api/Doctor/RegisterMother';
    readonly getDoctorAppointments = 'api/doctor/GetTodaysAppointments'
    readonly getAnganwadiAppointments = 'api/anganwadi/GetTodaysAppointments';
    readonly getMotherDetails = 'api/mother';
    readonly getMotherAppointment = 'api/mother/GetAppointment';
    readonly generateOTPURL = 'api/Appointment/GenerateOtp';
    readonly ValidateOtpURL = 'api/Appointment/ValidateOtp';

    constructor(private httpClient: HttpClient) {
        if (this.userList.length == 0) {
            this.userList.push(this.getAdmin());
        }
    }

    public userSubject = new BehaviorSubject<UserDetail>(null);
    public errorMessage = new BehaviorSubject<any>(null);

    private userListSubject = new Subject<IUser[]>();
    private userList: IUser[] = [];


    getDoctorAppointment() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        const url = `${this.getDoctorAppointments}`;
        return this.httpClient.get(url, { headers: headers, observe: "response" }).pipe(
            map(this.extractData2),
            tap(data => console.log('Get doctor appointments: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }

    getAnganwadiAppointment() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        const url = `${this.getAnganwadiAppointments}`;
        return this.httpClient.get(url, { headers: headers, observe: "response" }).pipe(
            map(this.extractData2),
            tap(data => console.log('Get anganwadi appointments: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }


    registerMother(motherReg: IMotherRegistration) {
        let headersObj = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        let self = this;
        const url = `${this.registorMom}`;
        return this.httpClient.post(url, motherReg, { headers: headersObj, observe: "response" }).pipe(
            map((p) => this.extractData2(p)),
            tap(data => {
                localStorage.setItem('token', data.token);
                this.userSubject.next(data);
            }),
            catchError(error => this.handleError(error, self))
        );
    }

    getUser(): Observable<UserDetail> {
        return this.userSubject.asObservable();
    }
    getsubject(): Observable<UserDetail> {
        return this.userSubject;
    }
    getMotherAppointments(): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        const url = `${this.getMotherAppointment}`;

        return this.httpClient.get(url, { headers: headers, observe: "response" }).pipe(
            map((p) => this.extractData2(p)),
            tap(data => {
                console.log(data)
            }),
            catchError(error => this.handleError(error, self))
        );
    }

    generateOTP(id): Observable<string> {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        const url = `${this.generateOTPURL}/${id}`;
        return this.httpClient.post(url, { headers: headers, observe: "response" }).pipe(
            tap(data => console.log('GetDescription: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }
    ValidateOtp(id: number, otpNumber: number): Observable<string> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        const url = `${this.ValidateOtpURL}`;
        var obj = <OtpClass>{};
        obj.id = id;
        obj.otp = otpNumber;
        return this.httpClient.post(url, obj, { headers: headers, observe: "response" }).pipe(
            tap(data => console.log('GetDescription: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }

    loggedOut() {
        localStorage.clear();
        this.userSubject.next(null);
    }

    getErrorMessage(): Observable<any> {
        return this.errorMessage;
    }
    getAdmin(): IUser {
        let user = <IUser>{};
        user.userName = "HMHNAdmin";
        user.password = "Admin@1234";
        user.userType = EmployeeType.Admin;
        user.userId = 1;
        return user;
    }

    getMotherById(id: number): Observable<IMother> {

        if (id === 0) {
            return null;
        };
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });

        const url = `${this.getMotherDetails}/${id}`;
        //return this.http.get(this.baseUrl1 + url)
        return this.httpClient.get(url, { headers: headers, observe: "response" }).pipe(
            map(this.extractData2),
            tap(data => console.log('GetDescription: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }
    checkUser(userName: string, password: string): Observable<any> {
        let headersObj = new HttpHeaders({ 'Content-Type': 'application/json' });
        var userLogin = <UserLogin>{}
        userLogin.password = password;
        userLogin.username = userName;
        let params = new HttpParams();
        params.set('userName', userName);
        params.set('password', password);
        var sad = { userName: userName, password: password };
        let self = this;
        const url = `${this.login}`;
        return this.httpClient.post(url, userLogin, { headers: headersObj, observe: "response" }).pipe(
            map((p) => this.extractData2(p)),
            tap(data => {
                localStorage.setItem('token', data.token);
                this.userSubject.next(data);
            }),
            catchError(error => this.handleError(error, self))
        );

        //return this.userList.filter(a => a.userName == userName && a.password == password).length > 0
    }

    private extractData2(response: HttpResponse<any>) {
        let body = response.body;
        return body || {};
    }

    private handleError(error: HttpResponse<any>, self: any): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        self.errorMessage.next(error);
        console.error(error);

        return Observable.throw(error || 'Server error');
    }
}

export interface UserLogin {
    username: string,
    password: string
}

export interface OtpClass {
    otp: number;
    id: number
}