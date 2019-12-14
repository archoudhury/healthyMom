import { OnInit, Component, OnDestroy } from "@angular/core";
import { UserService } from "../services/user.service";
import { SubSink } from "subsink";
import { IMother } from "../models/IMother";
import { UserDetail } from "../models/userDetail";

@Component({
    selector: 'app-personaldetail',
    templateUrl: './personaldetail.component.html',
    styleUrls: ['./personaldetail.component.css']
})
export class PersonaldetailComponent implements OnInit, OnDestroy {
    public detail: IMother;
    private user: UserDetail
    private subs = new SubSink();
    private id: number = 0;
    constructor(private service: UserService) {

    }
    ngOnInit(): void {
        this.subs.sink = this.service.getsubject().subscribe((res: any) => {
            if(res){
                this.user = res;
                this.id = res.id;
            }
        })
        this.subs.sink = this.service.getMotherById(this.id).subscribe((res: any) => {
            if (res) {
                console.log(res)
                this.detail = res;
            }
        })
    }
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}