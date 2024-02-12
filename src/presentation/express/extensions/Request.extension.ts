import { Request } from "express"
import { IAccountData } from "../../../app"


export interface ExtendRequest extends Request {
    account? : IAccountData
}