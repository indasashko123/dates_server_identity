import { IAccountRoleRepository,CreateAccountRoleDto } from "../../../app";
import { AccountRoleModel } from "../models";



export class AccountRoleRepository implements IAccountRoleRepository {
    async create (dto : CreateAccountRoleDto) : Promise<AccountRoleModel> {
        return AccountRoleModel.create(dto);
    }
}