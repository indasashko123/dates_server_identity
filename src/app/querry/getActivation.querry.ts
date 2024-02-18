import { ActivationTarget } from "..";
import { BaseQuerry } from "./baseQuerry";


export class GetActivationQuerry extends BaseQuerry {
    target? : ActivationTarget | string;
}