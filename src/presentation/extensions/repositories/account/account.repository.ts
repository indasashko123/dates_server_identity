import { inject, injectable } from "inversify";
import { AccountRepository } from "../../../../database";
import { IAccountRoleRepository, IRoleRepository } from "../../../../app";

@injectable()
export class AccountInjectableRepository extends AccountRepository {
    

    constructor (
       @inject("IRoleRepository") roleRepository  :IRoleRepository,
       @inject("IAccountRoleRepository") accountRoleRepository : IAccountRoleRepository
    ) { super (roleRepository,accountRoleRepository)}
} 

