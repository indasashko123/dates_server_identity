import { GetAccountQuerry } from "../../../common";
import { AccountModel, accountRepository } from "../../../database";



export class AccountService {
    async get(querry : GetAccountQuerry) : Promise<AccountModel[]> {
        return await accountRepository.get(querry);
    }
}