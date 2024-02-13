import { AccountTarget } from "..";
import { BaseQuerry } from "./baseQuerry";

export class GetAccountQuerry extends BaseQuerry{
    target? : AccountTarget | string;
    deleted? : boolean;
}