import { ProfileTarget } from "../enums/targets/profileTarget.enum";
import { BaseQuerry } from "./baseQuerry";


export class GetProfileQuerry extends BaseQuerry {
    target : ProfileTarget | string;
    isDeleted : boolean;
}