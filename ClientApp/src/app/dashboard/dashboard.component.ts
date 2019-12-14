import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../services/user.service';
import { IAppointment } from '../models/IAppoinment';
import { SubSink } from 'subsink';
import { IMother } from '../models/IMother';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public mother: IMother;
  private subs = new SubSink();
  constructor(private renderer: Renderer2, private service: UserService) { }
  @ViewChild('commentPoUp', { static: false }) public commentPoUp: ElementRef;

  rows: IAppointment[] = [
    // { name: 'Austin', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Dany', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Molly', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Austin', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Dany', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Molly', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Austin', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Dany', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    // { name: 'Molly', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
  ];
  columns = [
    { prop: 'name', label: 'Appointment  Name' },
    { prop: 'details', label: 'Details' },
    { prop: 'date', label: 'Date' },
  ];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected: IAppointment[] = [];
  ngOnInit() {
    this.subs.sink = this.service.getDoctorAppointment().subscribe((res: IAppointment[]) => {
      this.rows = res;
      console.log(res);
    })
  }

  onSelect(selcted: any) {
    this.service.getMotherById(selcted["selected"][0].motherId).subscribe((result: IMother) => {
      if (result) {
        this.mother = result;
      }
    })
    this.renderer.removeStyle(this.commentPoUp.nativeElement, "display");
    this.renderer.addClass(this.commentPoUp.nativeElement, "popUp");
  }

  closePopUp() {
    this.renderer.removeClass(this.commentPoUp.nativeElement, "popUp");
    this.renderer.setStyle(this.commentPoUp.nativeElement, "display", "none");
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
