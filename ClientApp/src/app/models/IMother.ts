import { IAuditDate } from "./IAuditDate";
import { IUser } from "./IUser";

export interface IMother extends IUser {
    name: string,
    husband: string,
    age: string,
    address: string,
    anganwadi: string,
    numberOfBabies: string,
    expextedDelivery: Date,
    fertilityDate: string,
    auditdate: IAuditDate
}