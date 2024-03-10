import { ProfileTarget } from "../../enums";
import { BaseQuerry } from "../baseQuerry";


export class GetProfileQuerry extends BaseQuerry<ProfileTarget> {
    isDeleted? : boolean;
}