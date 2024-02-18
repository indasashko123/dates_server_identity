import { BanTarget } from "../enums";
import { BaseQuerry } from "./baseQuerry";

export class GetBanQuerry extends BaseQuerry{
    target? : BanTarget | string;
}