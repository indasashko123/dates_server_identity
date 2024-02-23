import { GetAccountQuerry } from "../../querry";
import { IAccountCreationAttribute, IAccountRepository, IAccountService } from "../../interfaces";
import { Account } from "../../../domain";



export class AccountService implements IAccountService{

    constructor(private readonly accountRepository : IAccountRepository) {

    }

    async get(querry? : GetAccountQuerry) : Promise<Account[]> {
        return await this.accountRepository.get(querry);
    }

    async create (dto : IAccountCreationAttribute) : Promise<Account> {
        return await this.accountRepository.create(dto);
    }

    async getRolesNames(id : string) : Promise<string[]> {
        return await this.accountRepository.getRolesNames(id);
    }

    async update(account: Account): Promise<Account> {
        return await this.accountRepository.update(account);    
    }
}