import { 
    CreateAccountRoleDto,AccountTarget,
    GetAccountQuerry,IAccountCreationAttribute,
    IAccountRepository, IAccountRoleRepository, 
    RoleTarget, AccountRoleTarget,IRoleRepository } from "../../../../app";
import { QuerryCreator } from "../../../../app/utills";
import { Account, AccountRole } from "../../../../domain";
import { AccountModel} from "../../models";
import { roleRepository } from "./role.repository";
import { accountRoleRepository } from "./accountRole.repository";



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
            email : account.email,
            isDeleted : account.isDeleted,
            password : account.password,
            isActivated : account.isActivated,
        },{where : {id : account.id}});
        return await AccountModel.findByPk(account.id) as Account;
    }

    async get(querry?: GetAccountQuerry ): Promise<Account[]> {
        
        const condition : conditions = QuerryCreator.create({},querry) as conditions;
    
        if (!querry || !querry.value) {
            const accs =  await AccountModel.findAll(condition) as Account[];
            return accs;
        }
        if (querry.target === AccountTarget.id) {
            condition.where.isDeleted = !querry.deleted ? false : true;
            condition.where.id = String(querry.value);
            const accs = await AccountModel.findAll(condition) as Account[];
            return accs;
        }
        

        if (!querry.deleted) {
            condition.where.isDeleted = false;
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


export const accountRepository = new AccountRepository(
    roleRepository, accountRoleRepository
);