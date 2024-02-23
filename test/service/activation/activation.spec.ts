import { v4 } from 'uuid';
import { ActivationService, IActivationService } from '../../../src/app';
import { ActivationRepository } from '../../../src/database';
import { sync } from '../../database';

describe("account service test", ()=> {
    let activationService : IActivationService;


    beforeEach(
        async()=> { 
            await sync();
            const activationRepository = new ActivationRepository();
            activationService = new ActivationService(activationRepository);            
        });
    it ("create and get", async ()=> {
        const accountId = v4();
        const link = v4();
        const createdLink = await activationService.createLink({
            accountId,
            link });
        
        expect(createdLink).toBe(link);
    
        const activations = await activationService.get();
    
        expect(activations.length).toBe(1);
    });

    it ("get 5 activations", async()=> {
        const createdLink = await activationService.createLink({accountId : v4(),link : v4() });
        const createdLink1 = await activationService.createLink({accountId : v4(),link : v4() });
        const createdLink2 = await activationService.createLink({accountId : v4(),link : v4() });
        const createdLink3 = await activationService.createLink({accountId : v4(),link : v4() });
        const createdLink4 = await activationService.createLink({accountId : v4(),link : v4() });


        const get2p1 = await activationService.get({page : 1, perPage : 2});
        expect(get2p1.length).toBe(2);
        expect(get2p1[0].link).toBe(createdLink);
        expect(get2p1[1].link).toBe(createdLink1);

        const get3p2 = await activationService.get({page : 2, perPage : 3});
        expect(get3p2.length).toBe(2);
        expect(get3p2[0].link).toBe(createdLink3);
        expect(get3p2[1].link).toBe(createdLink4);
    });

    it ("confirm", async()=> {

        const accountId = v4();
        const link = v4();
        const createdLink = await activationService.createLink({
            accountId,
            link });

        const activationsNoConfirm = await activationService.get();
        expect(activationsNoConfirm[0].isEmailConfirmed).toBe(false);
            
        await activationService.confirmEmail({link : createdLink});

        const activations = await activationService.get();
        expect(activations[0].isEmailConfirmed).toBe(true);
    })
});
