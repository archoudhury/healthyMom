import { OnInit, Component, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { IAppointment } from "../models/IAppoinment";
import { UserDetail } from "../models/userDetail";
import { UserService } from "../services/user.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { IMother } from "../models/IMother";
import { SubSink } from "subsink";
import { AppintmentType } from "../shared/pipes/AppintmentType.pipe";
import { EmployeeType } from "../models/employeeType";
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class ToDoComponent implements OnInit {
    constructor(private renderer: Renderer2, private service: UserService) {
        this.counter$ = timer(0, 100).pipe(
            take(this.count),
            map(() => --this.count)
        );
    }
    counter$: Observable<number>;
    count = 60;
    public sel = [];
    public errorMessage: string = "";
    loadingIndicator : boolean = true;
    public generatedOTP: string = "";
    public isGeneratedOTP: boolean = false;
    public loading = false;
    completed = false;
    private subs = new SubSink();
    @ViewChild('commentPoUp', { static: false }) public commentPoUp: ElementRef;
    public isDisable: boolean = false;
    ColumnMode = ColumnMode;
    SelectionType = SelectionType;
    columns = [
        { prop: 'name', label: 'Appointment  Name' },
        { prop: 'details', label: 'Details' },
        { prop: 'type', label: 'Appointment type', pipe: { transform: this.pipeAppointmentType } },
        { prop: 'date', label: 'Date', pipe: { transform: this.datePipe } },
        { prop: 'isCompleted', label: 'Completed Status' }
    ];
    user: UserDetail;
    mother: IMother;
    selected: IAppointment[] = [];
    rows: IAppointment[] = [];
    ngOnInit(): void {
        this.subs.sink = this.service.getsubject().subscribe((res: any) => {
            this.user = res;
            
        })
        this.subs.sink = this.service.getMotherAppointments().subscribe((res: any) => {
            this.rows = res;
            this.loadingIndicator = false;
            console.log(res);
        })
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    datePipe(value: any, ...args: any[]) {
        return new Date(value).toLocaleString('en-US').split(',')[0];
    }
    pipeAppointmentType(value) {

        return EmployeeType[value]
    }


    onSelect(selcted: any) {
        this.loading = true;
        this.renderer.removeStyle(this.commentPoUp.nativeElement, "display");
        this.renderer.addClass(this.commentPoUp.nativeElement, "popUp");

        if (this.sel.length > 0 && this.sel[0].id != this.selected[0].id) {
            this.isGeneratedOTP = false;
        }
        // if (this.selected[0].isCompleted) {
        //     alert("Process already completed");
        //     this.errorMessage = "Process already completed";
        //     this.isDisable = true;
        //     this.loading = false;
        // } 
        else if (this.mother && selcted["selected"][0].motherId == this.mother.id) {
            this.loading = false;
            if (this.checkDate(new Date(this.selected[0].date))) {
                this.isDisable = false;
                this.errorMessage = "";
            } else {
                this.isDisable = true;
                this.errorMessage = "Generating OTP is enabled only for todays date.";
            }
        } else {
            this.subs.sink = this.service.getMotherById(selcted["selected"][0].motherId).subscribe((result: IMother) => {
                if (result) {
                    this.mother = result;
                    this.loading = false;
                    if (this.checkDate(new Date(this.selected[0].date))) {
                        this.isDisable = false;
                        this.errorMessage = "";
                    } else {
                        this.errorMessage = "Generating OTP is enabled only for todays date.";
                        this.isDisable = true;
                    }
                }
            })
        }
        this.sel = JSON.parse(JSON.stringify(this.selected));

        if (this.selected[0].isCompleted) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    }

    onActivate(event) {

    }
    checkDate(someDate) {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
    generateOTP() {
        if (this.checkDate(new Date(this.selected[0].date))) {
            this.service.generateOTP(this.selected[0].id).subscribe((res: string) => {
                this.generatedOTP = res;
                this.isGeneratedOTP = true;
                console.log(res);
            })
        }
    }
    closePopUp() {
        this.renderer.removeClass(this.commentPoUp.nativeElement, "popUp");
        this.renderer.setStyle(this.commentPoUp.nativeElement, "display", "none");
    }
}