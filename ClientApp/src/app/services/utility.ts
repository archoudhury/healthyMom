import { Injectable } from "@angular/core";

@Injectable()
export class UtilityService {

    constructor(){}
    //assign object from source to target
    assignObject(target, source) {
        return {
            ...target,
            ...source
        };
    }
}

