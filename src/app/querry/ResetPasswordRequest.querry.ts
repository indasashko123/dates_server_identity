import { ResetPasswordRequestTarget } from "../enums";
import { BaseQuerry } from "./baseQuerry";

export class ResetPasswordRequestQuerry extends BaseQuerry {
    target? : ResetPasswordRequestTarget | string;
}