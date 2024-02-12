import { CreateAccountRoleDto,AccountTarget,GetAccountQuerry,IAccountCreationAttribute,IAccountRepository, IAccountRoleRepository } from "../../../app";
import { IRoleRepository } from "../../../app/interfaces/repositories/iRole.repository";
import { Account, accountRole } from "../../../domain";
import { AccountModel, AccountRoleModel } from "../models";




export class AccountRepository implements IAccountRepository {
    

    constructor (
       private readonly roleRepository  :IRoleRepository,
       private readonly accountRoleRepository : IAccountRoleRepository
    ) {}

    async create(dto: IAccountCreationAttribute): Promise<Account> {
        return await AccountModel.create(dto);
    }

    async delete(id: string): Promise<boolean> {
        const delAcc = await AccountModel.destroy({where : {id : id}});
        if (delAcc) return true;
        return false;
    }

    async update(account: Account): Promise<Account> {
        await AccountModel.update(account,{where : {id : account.id}});
        return await AccountModel.findByPk(account.id);
    }

    async get(querry: GetAccountQuerry): Promise<Account[]> {
        if (querry.target === AccountTarget.id) {
            return await AccountModel.findAll({where : { id : querry.value}});
        }
        const condition : any = {};

        if (!querry.deleted) {
            condition.where.isDeleted = false;
        } 

        if (!querry.page) {
            condition.offset = 0;
        } else {
            condition.offset = (querry.page-1)*querry.perPage;
        }

        if (!querry.perPage) {
            condition.limit = 25;
        } else {
            condition.limit = querry.perPage;
        }


        if (querry.target === AccountTarget.email) {
            condition.where.email = querry.value;
        }
        if (querry.target == AccountTarget.login) {
            condition.where.login = querry.value;
        }

        const accs = await AccountModel.findAll(condition);
        return accs;
    }
 
    async getRolesNames(accountId : string) : Promise<string[]> {
        const accountRoles = await AccountRoleModel.findAll({
            where : {
                accountId 
            }
        });
        
        const roleIds = accountRoles.map(accountRole => accountRole.roleId);

        const roles = await this.roleRepository.get({ 
            id : roleIds
        });

        const roleNames = roles.map(role => role.name);


        return roleNames;
    }
    
    async createRole (dto : CreateAccountRoleDto) : Promise<accountRole> {
        return this.accountRoleRepository.create(dto);
    }

    
} 

