import { Request } from "express"
import { IAccountData } from "../../interfaces"


export interface ExtendRequest extends Request {
    account? : IAccountData
}