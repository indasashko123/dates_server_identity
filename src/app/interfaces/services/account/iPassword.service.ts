import { ResetPasswordLink, ResetPasswordRequest } from "../../../../domain";
import { ChangePassDto } from "../../../dto";



export interface IPasswordService {
    createResetRequest (id : string) : Promise<ResetPasswordRequest>;
    isRequestActive ( dto : ChangePassDto) : Promise<boolean>;
    deleteResetRequest(accountId : string) : Promise<boolean>;
    createResetLink( id : string) : Promise<ResetPasswordLink>;
    getResetLink(link : string) : Promise<ResetPasswordLink>;
    confirmLink(link : ResetPasswordLink) : Promise<ResetPasswordLink>;
}