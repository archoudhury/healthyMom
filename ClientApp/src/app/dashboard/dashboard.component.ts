import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../services/user.service';
import { IAppointment } from '../models/IAppoinment';
import { SubSink } from 'subsink';
import { IMother } from '../models/IMother';
import { EmployeeType } from '../models/employeeType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public mother: IMother;
  public errorMessage: string = "";
  private subs = new SubSink();
  loadingIndicator =  true;
  public isDisabled: boolean = true;
  constructor(private renderer: Renderer2, private service: UserService) { }
  @ViewChild('commentPoUp', { static: false }) public commentPoUp: ElementRef;

  rows: IAppointment[] = [];
  columns = [
    { prop: 'name', label: 'Appointment  Name' },
    { prop: 'details', label: 'Details' },
    { prop: 'type', label: 'Appointment type' },
    { prop: 'date', label: 'Date' },
    { prop: 'isCompleted', label: 'Completed Status' }
  ];
  otp: any;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected: IAppointment[] = [];
  ngOnInit() {
    this.getAppintments();
  }
  getAppintments() {
    this.subs.sink = this.service.getDoctorAppointment().subscribe((res: IAppointment[]) => {
      this.rows = res;
      this.loadingIndicator = false;
      console.log(res);
    })
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

  closePopUp() {
    this.renderer.removeClass(this.commentPoUp.nativeElement, "popUp");
    this.renderer.setStyle(this.commentPoUp.nativeElement, "display", "none");
  }

  datePipe(value: any, ...args: any[]) {
    return new Date(value).toLocaleString('en-US').split(',')[0];
  }
  pipeAppointmentType(value) {
    return EmployeeType[value]
  }

  onOtpChange(event) {
    this.otp = event;
    console.log(event);
  }
  ValidateOtp() {
    this.service.ValidateOtp(this.selected[0].id, +this.otp).subscribe((res: any) => {
      if (res) {
        this.getAppintments()
      }
    })
  }


  checkDate(someDate) {
    const today = new Date();
    var otpmin = someDate.getMinutes() + (someDate.getHours() * 60)
    var currentMin = today.getMinutes() + (today.getHours() * 60)
    return currentMin > otpmin > someDate.getMinutes() && someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  generateNumber(length: number) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  }
  onActivate(event) {
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
