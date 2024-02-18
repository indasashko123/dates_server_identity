import { sync } from '../../database';
import * as uuid from "uuid";
import { IActivationRepository } from '../../../src/app';
import { ActivationRepository } from '../../../src/database';
import { activationCreateDtos } from './activation.data';
import { Activation } from '../../../src/domain';

describe("account service test", ()=> {
    let activationRepository : IActivationRepository;
    const dtos = activationCreateDtos;
    beforeEach(
        async()=> {
            await sync();
            activationRepository = new ActivationRepository();
            for (let i = 0; i < dtos.length; i++) {
                await activationRepository.create(dtos[i]);
            }
        });

    it("create and get", async()=> {
        const accId = uuid.v4();
        const link  = uuid.v4();
        const createActivate = await activationRepository.create({
        accountId : accId,
        link
       });

       const getAcc = await activationRepository.get({
          target : 'accountId',
          value : accId
       })
       expect(getAcc[0].accountId).toBe(accId);
    });

    it ("get all no querry", async()=> {
        const accs = await activationRepository.get();
        
        expect(accs.length).toBe(dtos.length);
    });

    it ("get by accountId", async()=> {
        const getAcc = await activationRepository.get({target : "accountId", value : dtos[0].accountId});
        expect(getAcc[0].accountId).toBe(dtos[0].accountId);
        expect(getAcc[0].isEmailConfirmed).toBe(false);
        expect(getAcc[0].link).toBe(dtos[0].link);        
    });

    it ("get all 2 max, page1", async()=> {
        const accs = await activationRepository.get({
            perPage : 2,
            page : 1
        });
        
        expect(accs.length).toBe(2);
        expect(accs[0].accountId).toBe(dtos[0].accountId);
        expect(accs[1].accountId).toBe(dtos[1].accountId);
    });

    it ("get all 2 max, page2", async()=> {
        const accs = await activationRepository.get({
            perPage : 2,
            page : 2
        });
        
        expect(accs.length).toBe(2);
        expect(accs[0].accountId).toBe(dtos[2].accountId);
        expect(accs[1].accountId).toBe(dtos[3].accountId);
    });

    it ("get all 2 max, page3", async()=> {
        const accs = await activationRepository.get({
            perPage : 2,
            page : 3
        });    
        expect(accs.length).toBe(1);
        expect(accs[0].accountId).toBe(dtos[4].accountId);
    });

    it ("update as link", async()=> {
        const activateToUpdate : Activation = (await activationRepository.get({
            target : "accountId", value : dtos[0].accountId}))[0];
        activateToUpdate.isEmailConfirmed = true;
        const returnedActivate = await activationRepository.update(activateToUpdate);
        const updatedActivate = (await activationRepository.get({target : "accountId", value : dtos[0].accountId}))[0];
        
        expect(returnedActivate.isEmailConfirmed).toBe(true);
        expect(updatedActivate.isEmailConfirmed).toBe(true);
      
    });
});



