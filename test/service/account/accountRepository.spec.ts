import { sync } from '../../database';
import * as uuid from "uuid";
import { AccountService, AccountTarget, IAccountRepository, IAccountRoleRepository, IAccountService } from '../../../src/app';
import { AccountRepository, AccountRoleRepository, RoleRepository } from '../../../src/database';
import { IRoleRepository } from '../../../src/app/interfaces/repositories/iRole.repository';
import { accountCreateDtos } from './account.data';

describe("account service test", ()=> {
    let accountRepository : IAccountRepository;
    let roleRepository : IRoleRepository;
    let accountRoleRepository : IAccountRoleRepository;
    let accountService : IAccountService;
    const dtos = accountCreateDtos;

    /**
     * Create enviroment for tests.
     * Have one Role - User
     * Heve a five account with role - user  
     */
    beforeEach(
        async()=> {
            await sync();
            roleRepository = new RoleRepository();
            accountRoleRepository = new AccountRoleRepository();
            accountRepository = new AccountRepository(roleRepository,accountRoleRepository);
            await roleRepository.create({name : "USER"});
            for (let i = 0; i < dtos.length; i++) {
                await accountRepository.create(dtos[i]);
                await accountRoleRepository.create({accountId : dtos[i].id, roleId : 1});
            }
            accountService = new AccountService(accountRepository);
        });

    it("get all", async()=> {
       const accs = await accountService.get({});
       expect(accs.length).toBe(dtos.length); 
    });

    it("get by email", async()=> {
        const accs = await accountService.get({target : AccountTarget.email});
        expect(accs.length).toBe(1);
        expect(accs.length).toBe(1); 
    });

    it("get all", async()=> {
        const accs = await accountService.get({});
        expect(accs.length).toBe(dtos.length); 
    });

});



