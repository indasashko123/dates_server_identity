import { CreateAccountRoleDto } from "../../components/dto";
import { AccountRoleModel } from "../../database";
import { AccountModel } from "../../database/sequelize/models/account.model";
import { IAccountCreationAttribute } from "../creationAttibutes";




export interface IAccountRepository {

    create ( dto : IAccountCreationAttribute ) : Promise<AccountModel>;
    delete ( id : string ) : Promise<boolean>;
    update ( account : AccountModel) : Promise<AccountModel>;
    get( querry : any) : Promise<AccountModel[]>;
    getRolesNames(accountId : string) : Promise<string[]>;
    createRole (dto : CreateAccountRoleDto) : Promise<AccountRoleModel>
}