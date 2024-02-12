import { CreateAccountRoleDto } from "../../dto";
import { IAccountCreationAttribute } from "../creationAttibutes";
import { Account, accountRole } from "../../../domain";




export interface IAccountRepository {

    create ( dto : IAccountCreationAttribute ) : Promise<Account>;
    delete ( id : string ) : Promise<boolean>;
    update ( account : Account) : Promise<Account>;
    get( querry : any) : Promise<Account[]>;
    getRolesNames(accountId : string) : Promise<string[]>;
    createRole (dto : CreateAccountRoleDto) : Promise<accountRole
    >
}