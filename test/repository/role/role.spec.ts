import { sync } from '../../database';
import { RoleTarget, IRoleRepository } from '../../../src/app';
import { RoleRepository} from '../../../src/database';
import { Role } from '../../../src/domain';

describe("account service test", ()=> {
    let roleRepository : IRoleRepository;
    let role1: Role,role2: Role,role3: Role,role4 : Role, role5 : Role;
    let names = ['test1',"test2","test3","test4", "test5"]; 
    beforeEach(
        async()=> {
            await sync();
            roleRepository = new RoleRepository();
            role1 = await roleRepository.create({name : names[0]});
            role2 = await roleRepository.create({name : names[1]});
            role3 = await roleRepository.create({name : names[2]});
            role4 = await roleRepository.create({name : names[3]});
            role5 = await roleRepository.create({name : names[4]});    
        });

    it("create and get", async()=> {
        const roleName = "test";
        const createRole = await roleRepository.create({
        name : roleName});

       const roles = await roleRepository.get({
          target : RoleTarget.name,
          value : roleName
       })
       expect(roles[0].name).toBe(roleName);
    });


    it ("get all 2 max, page1", async()=> {

        const roles = await roleRepository.get({
            perPage : 2,
            page : 1
        });
        
        expect(roles.length).toBe(2);
        expect(roles[0].name).toBe(names[0]);
        expect(roles[1].name).toBe(names[1]);
    });

    it ("get all 2 max, page2", async()=> {

        const roles = await roleRepository.get({
            perPage : 2,
            page : 2
        });
        
        expect(roles.length).toBe(2);
        expect(roles[0].name).toBe(names[2]);
        expect(roles[1].name).toBe(names[3]);
    });

    it ("get all 2 max, page3", async()=> {

        const roles = await roleRepository.get({
            perPage : 2,
            page : 3
        });    
        expect(roles.length).toBe(1);
        expect(roles[0].name).toBe(names[4]);
    });

    it ("delete", async()=> {

        const rolesStarted = await roleRepository.get({});
        expect(rolesStarted.length).toBe(names.length);

        const role = (await roleRepository.get({target : RoleTarget.name, value : names[0]}))[0];
        await roleRepository.delete(role.id);

        const bans = await roleRepository.get();
        expect(bans.length).toBe(4);

        expect(bans[0].name).toBe(names[1]);
    });


});