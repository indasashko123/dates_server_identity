import { sync } from '../../database';
import {AccountRoleTarget, IAccountRoleRepository } from '../../../src/app';
import { AccountRoleRepository} from '../../../src/database';
import {accountCreateDtos } from "./accountRole.data";


describe("account service test", ()=> {
    let accountRoleRepository : IAccountRoleRepository;
    const dtos = accountCreateDtos;
    beforeEach(
        async()=> {
            await sync();
            accountRoleRepository = new AccountRoleRepository();
            for (let i = 0; i < dtos.length; i++) {
                await accountRoleRepository.create(dtos[i]);
            }
        });
    
        it ("get all no querry", async()=> {
            const accs = await accountRoleRepository.get();
            
            expect(accs.length).toBe(dtos.length);
        });
    
        it("create and get", async()=> {
        const accId = "00005"
        const createAcc = await accountRoleRepository.create({
         accountId : accId,
         roleId : 1
       });

       const getAcc = await accountRoleRepository.get({
          target : AccountRoleTarget.accountId,
          value : accId
       })
       expect(getAcc[0].id).toBe(createAcc.id);
       expect(getAcc[0].accountId).toBe(accId);
       expect(getAcc[0].roleId).toBe(1);
    });

    it ("get by accountid", async()=> {
        const getAcc = await accountRoleRepository.get({target : "accountId", value : dtos[0].accountId});
        expect(getAcc[0].accountId).toBe(dtos[0].accountId);
        expect(getAcc[0].roleId).toBe(dtos[0].roleId);
    });
});



