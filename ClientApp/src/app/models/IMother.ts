import { IAuditDate } from "./IAuditDate";
import { IUser } from "./IUser";

export interface IMother extends IUser {
    id: number;
    userId: number;
    name: string;
    husbandName: string;
    fertilityDate: Date;
    expectedDeliveryDate: Date;
    age: number;
    address: string;
    zip: string;
    anganwadi: number;
    numberOfBabies: any;
    numberOfPregnency: any;
    isHivInfected: boolean;
    otherComplications: string;
    createdBy: number;
    createdDate: Date;
    updatedby: any;
    updatedDate: Date;
}