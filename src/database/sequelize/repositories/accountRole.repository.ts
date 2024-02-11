import { CreateAccountRoleDto } from "../../../components/dto/account/createAccountRole.dto";
import { IAccountRoleRepository } from "../../../interfaces/repositories/iAccountRole.repository";
import { AccountRoleModel } from "../models";



export class AccountRoleRepository implements IAccountRoleRepository {
    async create (dto : CreateAccountRoleDto) : Promise<AccountRoleModel> {
        return AccountRoleModel.create(dto);
    }
}