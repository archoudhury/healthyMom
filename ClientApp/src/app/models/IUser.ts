import { IAuditDate } from "./IAuditDate";

export interface IUser {
    userId: number,
    mobile: number,
    aadhar: number,
    userName: string,
    password: string,
    userType: number,
    auditDate: IAuditDate,
}