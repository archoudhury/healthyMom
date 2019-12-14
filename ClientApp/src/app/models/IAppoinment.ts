export interface IAppointment {
    id: number;
    name: string,
    details: string,
    type: any
    date: Date,
    isCompleted: boolean,
    motherId: number,
    approverId: boolean,
    approverInput: string,
    otp: number,
    otpExpiry: Date,
    isOtpVerified: boolean,
    createdDate: Date,
    createdBy: number,
    updatedDate: Date,
    updatedBy: number
}