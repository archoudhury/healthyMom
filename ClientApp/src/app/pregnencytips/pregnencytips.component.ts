import { OnInit, Component, OnDestroy } from "@angular/core";
import { UserService } from "../services/user.service";
import { SubSink } from "subsink";
import { IMother } from "../models/IMother";

@Component({
    selector: 'app-pregnencytips',
    templateUrl: './pregnencytips.component.html',
    styleUrls: ['./pregnencytips.component.css']
})
export class PregnencyTipsComponent implements OnInit, OnDestroy {
    ngOnInit(){
        
    }
    ngOnDestroy(){

    }
    
}