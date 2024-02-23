import { sync } from '../../database';
import { AccountService, AccountTarget, IAccountRepository, IAccountRoleRepository, IAccountService, RoleTarget } from '../../../src/app';
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
       const accs = await accountService.get();
       expect(accs.length).toBe(dtos.length); 
    });

    it("get by email", async()=> {
        const accs = await accountService.get({target : AccountTarget.email, value : dtos[3].email});
        expect(accs.length).toBe(1);
        expect(accs[0].id).toBe(dtos[3].id); 
    });

    it("get by id", async()=> {
        const accs = await accountService.get({target : AccountTarget.id, value : dtos[2].id});
        expect(accs.length).toBe(1); 
        expect(accs[0].email).toBe(dtos[2].email); 
    });

    it("create acc", async()=> {
        const acc = await accountService.create({
            dateOfBirth : "111",
            email : "111",
            gender : "111",
            password : "xxxxxxxx",
            id : "id"
        });
        const accs = await accountService.get({target : AccountTarget.id, value : "id"});
        
        expect(accs.length).toBe(1);
        
        expect(accs[0].email).toBe("111");
        expect(accs[0].isDeleted).toBe(false);
     });

     it("delete acc", async()=> {
        const acc = (await accountService.get({target : "id", value : dtos[0].id}))[0];
        acc.isDeleted = true;
        const returned = await accountService.update(acc);
        const accs = await accountService.get();

        expect(accs.length).toBe(dtos.length -1);

        const accsWithDeleted = await accountService.get({deleted : true});

        expect(accsWithDeleted.length).toBe(dtos.length);
 
        const deletedAcc = (await accountService.get({target : "id", value : dtos[0].id, deleted : true}))[0];

        expect(deletedAcc.id).toBe(dtos[0].id);

        const deletedAccNone = (await accountService.get({target : "id", value : dtos[0].id}));

        expect(deletedAccNone.length).toBe(0);

        const accByEmail = (await accountService.get({target : AccountTarget.email, value : dtos[0].email}));

        expect(accByEmail.length).toBe(0);

        const deletedAccWithNoDelete = (await accountService.get({target : "id", value : dtos[0].id, deleted : false}));

        expect(deletedAccWithNoDelete.length).toBe(0);

        const accWithEmailNoDelete = (await accountService.get({target : AccountTarget.email, value : dtos[0].email, deleted : false}));

        expect(accWithEmailNoDelete.length).toBe(0);
    });

    it ("get roles", async()=> {
        const roles = await accountService.getRolesNames(dtos[0].id);
       
        expect(roles.length).toBe(1);
        expect(roles[0]).toBe('USER');

    });

    it ("add role get roles", async()=> {

        await roleRepository.create({name : "TEST"});
        const role = await roleRepository.get({target : RoleTarget.name, value : "TEST"});
        await accountRoleRepository.create({accountId : dtos[0].id, roleId : role[0].id });

        const roles = await accountService.getRolesNames(dtos[0].id);
    
        expect(roles.length).toBe(2);
        expect(roles[0]).toBe('USER');
        expect(roles[1]).toBe('TEST');
    });

});