import { ResetPasswordLinkTarget } from "../enums";
import { BaseQuerry } from "./baseQuerry";

export class ResetPasswordLinkQuerry extends BaseQuerry {
    target? : ResetPasswordLinkTarget | string;
}