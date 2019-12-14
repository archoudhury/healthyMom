import { OnInit, Component, OnDestroy } from "@angular/core";
import { UserService } from "../services/user.service";
import { SubSink } from "subsink";
import { IMother } from "../models/IMother";

@Component({
    selector: 'app-personaldetail',
    templateUrl: './personaldetail.component.html',
    styleUrls: ['./personaldetail.component.css']
})
export class PersonaldetailComponent implements OnInit, OnDestroy {
    public detail: IMother;
    private subs = new SubSink();
    constructor(private service: UserService) {

    }
    ngOnInit(): void {
        this.subs.sink = this.service.getsubject().subscribe((res: any) => {
            if (res) {
                this.detail = res;
            }
        })
    }
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}