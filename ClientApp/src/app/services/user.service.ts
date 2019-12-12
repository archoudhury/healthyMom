import { Subject, Observable } from "rxjs";
import { IUser } from "../models/IUser";
import { Injectable } from "@angular/core";
import { EmployeeType } from "../models/employeeType";

@Injectable()
export class UserService {
    constructor(){
        if(this.userList.length == 0){
            this.userList.push(this.getAdmin());
        }
    }

    private userSubject = new Subject<IUser>();
    private userListSubject = new Subject<IUser[]>();
    private userList: IUser[] = [];

    addUser(user: IUser) {
        this.userList.push(user);
        this.userListSubject.next(this.userList.slice());
        this.userSubject.next(user);
    }

    getUser() : Observable<IUser> {
        return this.userSubject.asObservable();
    }

    getAdmin(): IUser{
        let user = <IUser>{};
        user.userName = "HMHNAdmin";
        user.password = "Admin@1234";
        user.userType = EmployeeType.Admin;
        user.userId = 1;
        return user;
    }
    
    checkUser(userName: string, password: string) {
        return this.userList.filter(a => a.userName == userName && a.password == password).length > 0
    }
}