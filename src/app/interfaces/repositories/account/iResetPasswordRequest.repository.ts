import { ResetPasswordRequest } from "../../../../domain";
import { GetResetPasswordRequestQuerry } from "../../../querry";
import { IResetPasswordRequestCreationAttribute } from "../../creationAttibutes";



export interface IResetPasswordRequestRepository {
    create (dto : IResetPasswordRequestCreationAttribute) : Promise<ResetPasswordRequest>;
    get(querry? : GetResetPasswordRequestQuerry) : Promise<ResetPasswordRequest[]>;
    deleteByAccountId(accountId : string) : Promise<boolean>;
}