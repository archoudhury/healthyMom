import { IAuditDate } from "./IAuditDate";

export interface IAnganwadi{
    anganwadiId: number,
    Address: string,
    workerName: string,
    workedId: number,
    auditDate: IAuditDate,    
}