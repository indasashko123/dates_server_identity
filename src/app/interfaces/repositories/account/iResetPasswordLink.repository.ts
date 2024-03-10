import { ResetPasswordLink} from "../../../../domain";
import { ResetPasswordLinkQuerry } from "../../../querry";
import { IResetPasswordLinkCreationAttribute } from "../../creationAttibutes";



export interface IResetPasswordLinkRepository {
    create (dto : IResetPasswordLinkCreationAttribute) : Promise<ResetPasswordLink>;
    get(querry? : ResetPasswordLinkQuerry) : Promise<ResetPasswordLink[]>;
    deleteByAccountId(accountId : string) : Promise<boolean>;
    update ( data : ResetPasswordLink) : Promise<ResetPasswordLink>;
}