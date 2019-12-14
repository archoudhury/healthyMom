import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../services/user.service';
import { IAppointment } from '../models/IAppoinment';

@Component({
    selector: 'app-anganwadi',
    templateUrl: './anganwadi.component.html',
    styleUrls: ['./anganwadi.component.css']
})
export class AnganwadiComponent implements OnInit, OnDestroy {
    private subs = new SubSink();
    constructor(private renderer: Renderer2, private service: UserService) { }
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