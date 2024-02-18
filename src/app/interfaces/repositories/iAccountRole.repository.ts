import { CreateAccountRoleDto } from "../../dto";
import { AccountRole } from "../../../domain";
import { GetAccountRole } from "../../querry";




export interface IAccountRoleRepository {
    create (dto : CreateAccountRoleDto) : Promise<AccountRole>;
    get (querry? : GetAccountRole) : Promise<AccountRole[]>;
}