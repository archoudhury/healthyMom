export interface IMotherRegistration {
    motherId: number,
    motherName: string,
    aadhar: string,
    email: string,
    mobile: string,
    zip: string,
    doctorVisitDayOfMonth: string,
    anganwadiVisitDayOfWeek: string,
    anganwadiId: number,
    fertilityDate: Date
    expectedDeliveryDate: Date
    doctorId: number,
    isHivInfected: boolean,
    otherComplications: string,
    numberOfBabies: number,
    numberOfPregnency: number,
    husbandName: string,
    username: string,
    password: string
}