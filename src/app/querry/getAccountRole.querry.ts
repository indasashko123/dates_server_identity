import { AccountRoleTarget } from "../enums";
import { BaseQuerry } from "./baseQuerry";

export class GetAccountRole extends BaseQuerry {
    target : AccountRoleTarget | string;
}