import { sync } from '../../database';
import { IPasswordService } from '../../../src/app';
import { ResetPasswordLinkRepository, ResetPasswordRequestRepository } from '../../../src/database';
import { PasswordService } from '../../../src/app/services/account/password.service';
import { v4 } from 'uuid';


describe("account service test", ()=> {
    let passService : IPasswordService;

    beforeEach(
        async()=> {
            await sync();
            
            passService = new PasswordService(
                new ResetPasswordRequestRepository(),
                new ResetPasswordLinkRepository()
            );
        });

    it("create link", async()=> {
        const id = v4();
        const link = await passService.createResetLink(id);

        expect(link.isConfirmed).toBe(false);
        expect(link.accountId).toBe(id);
        
        const getLink = await passService.getResetLink(link.link);
        expect(getLink.id).toBe(link.id);
    });
   
    it ("confirm link", async ()=> {
        const id = v4();
        const link = await passService.createResetLink(id);
        await passService.confirmLink(link);
        const getLink = await passService.getResetLink(link.link);
        expect(getLink.isConfirmed).toBe(true);
    });

    it ("confirm link", async ()=> {
        const id = v4();
        const request = await passService.createResetRequest(id);
        
        const isActive = await passService.isRequestActive({accountId : id, newPassword : "", oldPassword : ""});
        
        expect(isActive).toBe(true);

        await passService.deleteResetRequest(id);

        const isActiveAfterDelete = await passService.isRequestActive({accountId : id, newPassword : "", oldPassword : ""});
        
        expect(isActiveAfterDelete).toBe(false);
    });
});