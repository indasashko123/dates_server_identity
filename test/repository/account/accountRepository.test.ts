import { expect } from 'chai';
import { describe, it } from 'mocha';
import { sync } from '../../database';
import uuid from "uuid";
import { IAccountRepository, IAccountRoleRepository } from '../../../src/app';
import { AccountRepository, AccountRoleRepository, RoleRepository } from '../../../src/database';
import { IRoleRepository } from '../../../src/app/interfaces/repositories/iRole.repository';



describe("account service test", async ()=> {
    let accountRepository : IAccountRepository;
    let roleRepository : IRoleRepository;
    let accountRoleRepository : IAccountRoleRepository;
    beforeEach(
        async()=> {
            await sync();
            roleRepository = new RoleRepository();
            accountRoleRepository = new AccountRoleRepository();
            accountRepository = new AccountRepository(roleRepository,accountRoleRepository);
        });
    it("work it", async()=> {
        const accId = uuid.v4();
        const createAcc = await accountRepository.create({
        dateOfBirth : '12.01.1990',
        email : "sasha@mail.ru",
        gender : "1",
        password : "xxxxxxxx",
        id : accId
       });
       expect(createAcc.id).to.be.equal(accId);
    })
})
