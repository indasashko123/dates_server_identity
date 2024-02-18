import { sync } from '../../database';
import { BanTarget, IBanRepository } from '../../../src/app';
import { BanRepository} from '../../../src/database';

describe("account service test", ()=> {
    let banRepository : IBanRepository;
    beforeEach(
        async()=> {
            await sync();
            banRepository = new BanRepository();
        });

    it("create and get", async()=> {
        const createBan = await banRepository.create({
            userId : "1",
            moderatorId : "2",
            endDate : "2024"
        });

       const bans = await banRepository.get({
          target : BanTarget.userId,
          value : "1"
       })
       expect(bans[0].endDate).toBe("2024");
    });


    it ("get all 2 max, page1", async()=> {

        const ban1 = await banRepository.create({endDate : "0001",moderatorId : "1", userId : "2"});
        const ban2 = await banRepository.create({endDate : "0002",moderatorId : "1", userId : "3"});
        const ban3 = await banRepository.create({endDate : "0003",moderatorId : "1", userId : "4"});
        const ban4 = await banRepository.create({endDate : "0004",moderatorId : "1", userId : "5"});
        const ban5 = await banRepository.create({endDate : "0005",moderatorId : "1", userId : "6"});


        const bans = await banRepository.get({
            perPage : 2,
            page : 1
        });
        
        expect(bans.length).toBe(2);
        expect(bans[0].userId).toBe("2");
        expect(bans[1].userId).toBe("3");
    });

    it ("get all 2 max, page2", async()=> {

        
        const ban1 = await banRepository.create({endDate : "0001",moderatorId : "1", userId : "2"});
        const ban2 = await banRepository.create({endDate : "0002",moderatorId : "1", userId : "3"});
        const ban3 = await banRepository.create({endDate : "0003",moderatorId : "1", userId : "4"});
        const ban4 = await banRepository.create({endDate : "0004",moderatorId : "1", userId : "5"});
        const ban5 = await banRepository.create({endDate : "0005",moderatorId : "1", userId : "6"});


        const bans = await banRepository.get({
            perPage : 2,
            page : 2
        });
        
        expect(bans.length).toBe(2);
        expect(bans[0].userId).toBe("4");
        expect(bans[1].userId).toBe("5");
    });

    it ("get all 2 max, page3", async()=> {

        const ban1 = await banRepository.create({endDate : "0001",moderatorId : "1", userId : "2"});
        const ban2 = await banRepository.create({endDate : "0002",moderatorId : "1", userId : "3"});
        const ban3 = await banRepository.create({endDate : "0003",moderatorId : "1", userId : "4"});
        const ban4 = await banRepository.create({endDate : "0004",moderatorId : "1", userId : "5"});
        const ban5 = await banRepository.create({endDate : "0005",moderatorId : "1", userId : "6"});

        const bans = await banRepository.get({
            perPage : 2,
            page : 3
        });    
        expect(bans.length).toBe(1);
        expect(bans[0].userId).toBe("6");
    });

    it ("delete", async()=> {
        const ban1 = await banRepository.create({endDate : "0001",moderatorId : "1", userId : "2"});
        const ban2 = await banRepository.create({endDate : "0002",moderatorId : "1", userId : "3"});
        const ban3 = await banRepository.create({endDate : "0003",moderatorId : "1", userId : "4"});
        const ban4 = await banRepository.create({endDate : "0004",moderatorId : "1", userId : "5"});
        const ban5 = await banRepository.create({endDate : "0005",moderatorId : "1", userId : "6"});

        const bansStarted = await banRepository.get({});
        expect(bansStarted.length).toBe(5);

        const ban = (await banRepository.get({target : "userId", value : "2"}))[0];
        await banRepository.delete(ban.id);

        const bans = await banRepository.get();
        expect(bans.length).toBe(4);

        expect(bans[0].userId).toBe("3");
    });
    it ("get all no querry", async()=> {
        
        const ban1 = await banRepository.create({endDate : "0001",moderatorId : "1", userId : "2"});
        const ban2 = await banRepository.create({endDate : "0002",moderatorId : "1", userId : "3"});
        const ban3 = await banRepository.create({endDate : "0003",moderatorId : "1", userId : "4"});
        const ban4 = await banRepository.create({endDate : "0004",moderatorId : "1", userId : "5"});
        const ban5 = await banRepository.create({endDate : "0005",moderatorId : "1", userId : "6"});

        const accs = await banRepository.get();
        
        expect(accs.length).toBe(5);
    });

});