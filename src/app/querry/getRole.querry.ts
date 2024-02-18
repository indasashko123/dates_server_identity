import { RoleTarget } from "../enums";
import { BaseQuerry } from "./baseQuerry";

export class GetRoleQuerry extends BaseQuerry{
    target? : RoleTarget;
}