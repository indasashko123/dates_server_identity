import { AccountTarget } from "..";
import { BaseQuerry } from "./baseQuerry";

export class GetAccountQuerry extends BaseQuerry{
    target? : AccountTarget;
    deleted? : boolean;
}