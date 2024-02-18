import { IAccountRoleRepository,CreateAccountRoleDto, AccountRoleTarget } from "../../../app";
import { GetAccountRole } from "../../../app/querry/getAccountRole.querry";
import { AccountRole } from "../../../domain";
import { AccountRoleModel } from "../models";


interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number | string;
        accountId : string;
        roleId : string;
    }
}

export class AccountRoleRepository implements IAccountRoleRepository {
    async create (dto : CreateAccountRoleDto) : Promise<AccountRole> {
        const accRole = await AccountRoleModel.create(dto);
        return accRole as AccountRole;
    }
    
    async get (querry? : GetAccountRole) : Promise<AccountRole[]> {
        if (!querry) {
            return await AccountRoleModel.findAll();
        }
        if (querry.target === AccountRoleTarget.id) {
            return await AccountRoleModel.findAll({where : {id : querry.value}});
        }

        if (querry.target === AccountRoleTarget.accountId) {
            return await AccountRoleModel.findAll({where : {accountId : querry.value}});    
        }

        if (querry.target === AccountRoleTarget.roleId) {
            return await AccountRoleModel.findAll({where : {roleId : querry.value}});    
        }
        return await AccountRoleModel.findAll();    
    }
}