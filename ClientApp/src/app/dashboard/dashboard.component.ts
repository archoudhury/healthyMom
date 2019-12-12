import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private renderer: Renderer2) { }
  @ViewChild('commentPoUp', { static: false }) public commentPoUp: ElementRef;

  rows = [
    { name: 'Austin', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Dany', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Molly', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Austin', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Dany', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Molly', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Austin', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Dany', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
    { name: 'Molly', aadhar: this.generateNumber(16), mobile: this.generateNumber(10), anganwadiToReport: "XYZ" },
  ];
  columns = [
    { prop: 'name', label: 'Mother Name' },
    { prop: 'aadhar', label: 'Aadhar number' },
    { prop: 'mobile', label: 'Mobile number' },
    { prop: 'anganwadiToReport', label: 'Anganwadi To Report' },


  ];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected = [];


  ngOnInit() {
  }

  onSelect(selcted: any) {

    this.renderer.removeStyle(this.commentPoUp.nativeElement, "display");
    this.renderer.addClass(this.commentPoUp.nativeElement, "popUp");
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
}
