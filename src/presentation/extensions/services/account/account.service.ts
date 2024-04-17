import { inject, injectable } from "inversify";
import { AccountService, IAccountRepository } from "../../../../app";

@injectable()
export class AccountInjectableService extends AccountService{

    constructor(
        @inject("IAccountRepository") accountRepository : IAccountRepository) {
            super(accountRepository);
    }
}