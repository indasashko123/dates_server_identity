import { ResetPasswordLink} from "../../../../domain";
import { GetResetPasswordLinkQuerry } from "../../../querry";
import { IResetPasswordLinkCreationAttribute } from "../../creationAttibutes";



export interface IResetPasswordLinkRepository {
    create (dto : IResetPasswordLinkCreationAttribute) : Promise<ResetPasswordLink>;
    get(querry? : GetResetPasswordLinkQuerry) : Promise<ResetPasswordLink[]>;
    deleteByAccountId(accountId : string) : Promise<boolean>;
    update ( data : ResetPasswordLink) : Promise<ResetPasswordLink>;
}