import { IAccountRoleRepository,CreateAccountRoleDto } from "../../../app";
import { accountRole } from "../../../domain";
import { AccountRoleModel } from "../models";



export class AccountRoleRepository implements IAccountRoleRepository {
    async create (dto : CreateAccountRoleDto) : Promise<accountRole> {
        const accRole = await AccountRoleModel.create(dto);
        return accRole as accountRole;
    }
}