import { sync } from '../../database';
import * as uuid from "uuid";
import { IResetPasswordRequestRepository, ResetPasswordRequestTarget } from '../../../src/app';
import { resetPasswordRequestCreateDtos } from './resetPasswordRequest.data';
import { ResetPasswordRequestRepository } from '../../../src/database';

describe("account service test", ()=> {
    let resetPasswordRepository : IResetPasswordRequestRepository;
    const dtos = resetPasswordRequestCreateDtos;
    beforeEach(
        async()=> {
            await sync();
            resetPasswordRepository = new ResetPasswordRequestRepository();
            for (let i = 0; i < dtos.length; i++) {
                await resetPasswordRepository.create(dtos[i]);
            }
        });

    it("create and get", async()=> {
        const accId = uuid.v4();
        await resetPasswordRepository.create({
        accountId : accId,
        endDate : "1"
        });

       const resetRequests = await resetPasswordRepository.get({
          target : 'accountId',
          value : accId
       })
       expect(resetRequests[0].accountId).toBe(accId);
       expect(resetRequests[0].endDate).toBe("1");
    });

    it ("get by account id", async()=> {
        const resetRequests = await resetPasswordRepository.get({target : "accountId", value : dtos[0].accountId});
        expect(resetRequests[0].accountId).toBe(dtos[0].accountId);
        expect(resetRequests[0].endDate).toBe(dtos[0].endDate);  
    });

    it ("delete", async()=> {

        const started = await resetPasswordRepository.get({});
        expect(started.length).toBe(dtos.length);

        const passwordResetRequest = (await resetPasswordRepository.get(
            {target :ResetPasswordRequestTarget.accountId, value : dtos[0].accountId}))[0];
        await resetPasswordRepository.deleteByAccountId(passwordResetRequest.accountId);

        const updated = await resetPasswordRepository.get();
        expect(updated.length).toBe(dtos.length-1);

        expect(updated[0].accountId).toBe(dtos[1].accountId);
    });

});



