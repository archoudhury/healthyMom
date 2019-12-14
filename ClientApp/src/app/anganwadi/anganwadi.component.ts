import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../services/user.service';
import { IAppointment } from '../models/IAppoinment';
import { IMother } from '../models/IMother';
import { EmployeeType } from '../models/employeeType';

@Component({
    selector: 'app-anganwadi',
    templateUrl: './anganwadi.component.html',
    styleUrls: ['./anganwadi.component.css']
})
export class AnganwadiComponent implements OnInit, OnDestroy {
    private subs = new SubSink();
    constructor(private renderer: Renderer2, private service: UserService) { }
    @ViewChild('commentPoUp', { static: false }) public commentPoUp: ElementRef;
    public mother: IMother;
    otp: any;
    rows = [
    ];
    columns = [
        { prop: 'name', label: 'Appointment  Name' },
        { prop: 'details', label: 'Details' },
        { prop: 'type', label: 'Appointment type' },
        { prop: 'date', label: 'Date' },
        { prop: 'isCompleted', label: 'Completed Status' }
    ];
    ColumnMode = ColumnMode;
    SelectionType = SelectionType;
    selected = [];
    public errorMessage: string = "";
    public isDisabled: boolean = true;


    ngOnInit() {
        this.getAppintments();
    }

    getAppintments() {
        this.subs.sink = this.service.getAnganwadiAppointment().subscribe((res: any[]) => {
            if (res && res.length > 0) {
                this.rows = res;
            }
        })
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onSelect(selcted: any) {

        if (this.mother == undefined || this.mother == null) {
            this.service.getMotherById(selcted["selected"][0].motherId).subscribe((result: IMother) => {
                if (result) {
                    this.mother = result;
                }
            })
        }
        if (this.selected[0].isCompleted) {
            alert("Process already completed");
            this.errorMessage = "Process already completed";
            this.isDisabled = true;
        }
        else if (this.selected[0].otp != undefined && this.selected[0].otp != null && this.selected[0].otp.toString().length == 4) {
            if (this.checkDate(new Date(this.selected[0].otpExpiry))) {
                alert("otp expired");
                this.errorMessage = "otp expired";
                this.isDisabled = true;
            } else {
                this.isDisabled = false;
                this.errorMessage = "";
            }
        } else {
            alert("No OTP for this record");
            this.errorMessage = "No OTP for this record";
            this.isDisabled = true;
        }

        this.renderer.removeStyle(this.commentPoUp.nativeElement, "display");
        this.renderer.addClass(this.commentPoUp.nativeElement, "popUp");
    }
    pipeAppointmentType(value) {
        return EmployeeType[value]
    }
    checkDate(someDate) {
        const today = new Date();
        var otpmin = someDate.getMinutes() + (someDate.getHours() * 60)
        var currentMin = today.getMinutes() + (today.getHours() * 60)
        return currentMin > otpmin && someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
    onOtpChange(event) {
        this.otp = event;
        console.log(event);
    }
    closePopUp() {
        this.renderer.removeClass(this.commentPoUp.nativeElement, "popUp");
        this.renderer.setStyle(this.commentPoUp.nativeElement, "display", "none");
    }

    generateNumber(length: number) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

        // return Math.floor(100000000 + Math.random() * 9000000000000000);
    }
    onActivate(event) {
        console.log('Activate Event', event);
    }
    ValidateOtp() {
        this.service.ValidateOtp(this.selected[0].id, +this.otp).subscribe((res: any) => {
            if (res) {
                this.getAppintments();
            }
        })
    }
}