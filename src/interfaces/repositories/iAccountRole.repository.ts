import { CreateAccountRoleDto } from "../../components/dto";
import { AccountRoleModel } from "../../database";




export interface IAccountRoleRepository {
    create (dto : CreateAccountRoleDto) : Promise<AccountRoleModel>;
}