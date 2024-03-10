import { ResetPasswordRequest } from "../../../../domain";
import { ResetPasswordRequestQuerry } from "../../../querry";
import { IResetPasswordRequestCreationAttribute } from "../../creationAttibutes";



export interface IResetPasswordRequestRepository {
    create (dto : IResetPasswordRequestCreationAttribute) : Promise<ResetPasswordRequest>;
    get(querry? : ResetPasswordRequestQuerry) : Promise<ResetPasswordRequest[]>;
    deleteByAccountId(accountId : string) : Promise<boolean>;
}