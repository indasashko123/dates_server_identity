import { sync } from '../../database';
import * as uuid from "uuid";
import { IAccountRepository, IAccountRoleRepository } from '../../../src/app';
import { AccountRepository, AccountRoleRepository, RoleRepository } from '../../../src/database';
import { IRoleRepository } from '../../../src/app/interfaces/repositories/iRole.repository';
import { accountCreateDtos } from './account.data';
import { Account } from '../../../src/domain';

describe("account service test", ()=> {
    let accountRepository : IAccountRepository;
    let roleRepository : IRoleRepository;
    let accountRoleRepository : IAccountRoleRepository;
    const dtos = accountCreateDtos;
    beforeEach(
        async()=> {
            await sync();
            roleRepository = new RoleRepository();
            accountRoleRepository = new AccountRoleRepository();
            accountRepository = new AccountRepository(roleRepository,accountRoleRepository);
            for (let i = 0; i < dtos.length; i++) {
                await accountRepository.create(dtos[i]);
            }
        });

    it("create and get", async()=> {
        const accId = uuid.v4();
        const createAcc = await accountRepository.create({
        dateOfBirth : '12.01.1990',
        email : "sasha@mail.ru",
        gender : "1",
        password : "xxxxxxxx",
        id : accId
       });

       const getAcc = await accountRepository.get({
          target : 'id',
          value : accId
       })
       expect(getAcc[0].id).toBe(accId);
    });

    it ("get by id", async()=> {
        const getAcc = await accountRepository.get({target : "id", value : dtos[0].id});
        expect(getAcc[0].id).toBe(dtos[0].id);
        expect(getAcc[0].dateOfBirth).toBe(dtos[0].dateOfBirth);
        expect(getAcc[0].email).toBe(dtos[0].email);
        expect(getAcc[0].isDeleted).toBe(false);        
    });

    it ("get all 2 max, page1", async()=> {
        const accs = await accountRepository.get({
            perPage : 2,
            page : 1
        });
        
        expect(accs.length).toBe(2);
        expect(accs[0].id).toBe(dtos[0].id);
        expect(accs[1].id).toBe(dtos[1].id);
    });

    it ("get all no querry", async()=> {
        const accs = await accountRepository.get();
        
        expect(accs.length).toBe(dtos.length);
    });


    it ("get all 2 max, page2", async()=> {
        const accs = await accountRepository.get({
            perPage : 2,
            page : 2
        });
        
        expect(accs.length).toBe(2);
        expect(accs[0].id).toBe(dtos[2].id);
        expect(accs[1].id).toBe(dtos[3].id);
    });

    it ("get all 2 max, page3", async()=> {
        const accs = await accountRepository.get({
            perPage : 2,
            page : 3
        });    
        expect(accs.length).toBe(1);
        expect(accs[0].id).toBe(dtos[4].id);
    });

    it ("update as link", async()=> {
        const accToUpdate : Account = (await accountRepository.get({target : "id", value : dtos[0].id}))[0];
        const newDob =  "new DOB";
        accToUpdate.dateOfBirth =newDob;
        const newPass = "new password"
        accToUpdate.password = newPass;
        const returnedAcc = await accountRepository.update(accToUpdate);
        const updatedAcc : Account = (await accountRepository.get({target : "id", value : dtos[0].id}))[0];
        
        expect(returnedAcc.dateOfBirth).toBe(newDob);
        expect(returnedAcc.password).toBe(newPass);
        
        expect(updatedAcc.dateOfBirth).toBe(newDob);
        expect(updatedAcc.password).toBe(newPass);
    });

    it ("update as object", async()=> {
        
        const newDob =  "new DOB";
        const newPass = "new password"
        const accToUpdate : Account = {
            dateOfBirth : newDob,
            password : newPass,
            id : dtos[0].id,
            email : dtos[0].email,
            gender : dtos[0].gender,
            isDeleted : false
        };
        const returnedAcc = await accountRepository.update(accToUpdate);
        const updatedAcc : Account = (await accountRepository.get({target : "id", value : dtos[0].id}))[0];
        
        expect(returnedAcc.dateOfBirth).toBe(newDob);
        expect(returnedAcc.password).toBe(newPass);
        
        expect(updatedAcc.dateOfBirth).toBe(newDob);
        expect(updatedAcc.password).toBe(newPass);
    });

    it ("get deleted", async()=> {
        const accsStarted = await accountRepository.get({});
        expect(accsStarted.length).toBe(5);

        const acc = (await accountRepository.get({target : "id", value : dtos[0].id}))[0];
        acc.isDeleted = true;
        await accountRepository.update(acc);

        const accs = await accountRepository.get();
        expect(accs.length).toBe(4);

        expect(accs[0].id).toBe(dtos[1].id);

        const accsDeleted = await accountRepository.get({deleted : true});
        expect(accsDeleted.length).toBe(5);
    });

    it ("delete", async()=> {
        const isDel = await accountRepository.delete(dtos[0].id);
        expect(isDel).toBe(true);
        const accs = await accountRepository.get();
        expect(accs.length).toBe(4); 
    });



});



