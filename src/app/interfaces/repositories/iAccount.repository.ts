import { CreateAccountRoleDto } from "../../dto";
import { IAccountCreationAttribute } from "../creationAttibutes";
import { Account, accountRole } from "../../../domain";
import { GetAccountQuerry } from "../../querry";




export interface IAccountRepository {

    create ( dto : IAccountCreationAttribute ) : Promise<Account>;
    delete ( id : string ) : Promise<boolean>;
    update ( account : Account) : Promise<Account>;
    get( querry? : GetAccountQuerry) : Promise<Account[]>;
    getRolesNames(accountId : string) : Promise<string[]>;
    createRole (dto : CreateAccountRoleDto) : Promise<accountRole
    >
}