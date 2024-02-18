import { sync } from '../../database';
import * as uuid from "uuid";
import { IResetPasswordLinkRepository } from '../../../src/app';
import { resetPasswordLinkCreateDtos } from './resetPasswordLink.data';
import { ResetPasswordLinkRepository } from '../../../src/database/sequelize/repositories/resetPasswordLink.repository';
import { resetPasswordLinkRepository } from '../../../src/database';

describe("account service test", ()=> {
    let resetPasswordRepository : IResetPasswordLinkRepository;
    const dtos = resetPasswordLinkCreateDtos;
    beforeEach(
        async()=> {
            await sync();
            resetPasswordRepository = new ResetPasswordLinkRepository();
            for (let i = 0; i < dtos.length; i++) {
                await resetPasswordRepository.create(dtos[i]);
            }
        });

    it("create and get", async()=> {
        const accId = uuid.v4();
        const link = uuid.v4();
        await resetPasswordRepository.create({
        accountId : accId,
        link 
        });

       const resetLLinks = await resetPasswordRepository.get({
          target : 'accountId',
          value : accId
       })
       expect(resetLLinks[0].accountId).toBe(accId);
       expect(resetLLinks[0].link).toBe(link);
    });

    it ("get by account id", async()=> {
        const resetLLinks = await resetPasswordRepository.get({target : "accountId", value : dtos[0].accountId});
        expect(resetLLinks[0].accountId).toBe(dtos[0].accountId);
        expect(resetLLinks[0].isConfirmed).toBe(false);
        expect(resetLLinks[0].link).toBe(dtos[0].link);      
    });

    
    it ("update as link", async()=> {
        const resetLLinkToUpdate = (await resetPasswordLinkRepository.get(
            {target : "accountId", value : dtos[0].accountId}))[0];
        
        resetLLinkToUpdate.isConfirmed = true;
        const returnedLink = await resetPasswordLinkRepository.update(resetLLinkToUpdate);
        const updatedLink  = (await resetPasswordLinkRepository.get({target : "accountId", value : dtos[0].accountId}))[0];
        
        expect(returnedLink.isConfirmed
            ).toBe(true);
        expect(updatedLink.isConfirmed
            ).toBe(true);

    });

});



