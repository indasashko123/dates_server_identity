import { CreateAccountRoleDto,AccountTarget,GetAccountQuerry,IAccountCreationAttribute,IAccountRepository, IAccountRoleRepository, RoleTarget, AccountRoleTarget } from "../../../app";
import { IRoleRepository } from "../../../app/interfaces/repositories/iRole.repository";
import { Account, AccountRole } from "../../../domain";
import { AccountModel, AccountRoleModel } from "../models";



interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number | string;
        isDeleted? : boolean;
        email? : string;
    }
}


export class AccountRepository implements IAccountRepository {
    

    constructor (
       private readonly roleRepository  :IRoleRepository,
       private readonly accountRoleRepository : IAccountRoleRepository
    ) {}

    async create(dto: IAccountCreationAttribute): Promise<Account> {
        return await AccountModel.create(dto) as Account;
    }

    async delete(id: string): Promise<boolean> {
        const delAcc = await AccountModel.destroy({where : {id : id}});
        if (delAcc) return true;
        return false;
    }

    async update(account: Account): Promise<Account> {

        await AccountModel.update({
            dateOfBirth : account.dateOfBirth,
            email : account.email,
            isDeleted : account.isDeleted,
            password : account.password    
        },{where : {id : account.id}});
        return await AccountModel.findByPk(account.id) as Account;
    }

    async get(querry?: GetAccountQuerry ): Promise<Account[]> {
        if (!querry) {
            return await AccountModel.findAll({where : {isDeleted : false}});
        }
        if (querry.target === AccountTarget.id) {
            return await AccountModel.findAll({where : { id : querry.value}});
        }
        let condition : conditions = {
            where : {}
        };

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
            condition.where.email = String(querry.value);
        }

        const accs = await AccountModel.findAll(condition) as Account[];
        return accs;
    }
 
    async getRolesNames(accountId : string) : Promise<string[]> {
        
        const accountRoles =await this.accountRoleRepository.get({
            target : AccountRoleTarget.accountId,
            value : accountId
        })

        const roleIds = accountRoles.map(accountRole => accountRole.roleId);

        const roles = await this.roleRepository.get({ 
            target :  RoleTarget.id,
            value : roleIds
        });

        const roleNames = roles.map(role => role.name);
        
        return roleNames;
    }
    
    async createRole (dto : CreateAccountRoleDto) : Promise<AccountRole> {
        return this.accountRoleRepository.create(dto);
    }    
} 

