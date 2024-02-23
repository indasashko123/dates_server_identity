import { BanService, IBanService } from '../../../src/app';
import { BanRepository } from '../../../src/database';
import { sync } from '../../database';

describe("account service test", ()=> {
    let banService : IBanService;


    beforeEach(
        async()=> { 
            await sync();
            const banRepository = new BanRepository()
            banService = new BanService(banRepository);            
        });
    it ("mock", ()=> {
        expect(true).toBe(true);
    })
});
