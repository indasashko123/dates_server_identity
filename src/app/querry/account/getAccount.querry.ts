import { AccountTarget } from "../../enums";
import { BaseQuerry } from "../baseQuerry";

export class GetAccountQuerry extends BaseQuerry<AccountTarget>{
    deleted? : boolean;
}