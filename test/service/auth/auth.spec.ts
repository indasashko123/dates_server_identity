import { AccountService, AccountTarget, ActivationService, AuthService, IAccountService, IAuthService, ITokenPayload, ITokenService, TokenService } from "../../../src/app";
import { PasswordService } from "../../../src/app/services/account/password.service";
import { MockMailService } from "../../../src/app/services/mail/mock.mail.service";
import { AccountRepository, AccountRoleRepository, ActivationRepository, ResetPasswordLinkRepository, ResetPasswordRequestRepository, RoleRepository } from "../../../src/database";
import { LoginResponce } from "../../../src/app/dto/responces";
import { sync } from "../../database";
import { advanceTo, clear } from 'jest-date-mock';


let authService : IAuthService;
let accountService : IAccountService;
let tokenService : ITokenService;


describe("auth service " , ()=> {
    

    beforeEach(async()=> {
        advanceTo(new Date(2022, 0, 1));
        await sync();
        const roleRepository = new RoleRepository();
        const accountRoleRepository = new AccountRoleRepository();
        const accountRepository = new AccountRepository(roleRepository,accountRoleRepository);
        accountService = new AccountService(accountRepository);
        await roleRepository.create({name : "USER"});
        const activationRepository = new ActivationRepository();
        const activationService = new ActivationService(activationRepository);
        const mailService = new MockMailService();
        tokenService = new TokenService();
        const resetPasswordLinkRepository = new ResetPasswordLinkRepository();
        const resetPasswordRequestRepository = new ResetPasswordRequestRepository();

        const passwordService = new PasswordService(resetPasswordRequestRepository,resetPasswordLinkRepository);
        
        authService = new AuthService(
            accountService, 
            activationService,mailService, 
            tokenService, 
            accountRoleRepository,
            passwordService );
    });



    it("work", async()=> {
        expect(1).toBe(1);
    });

    it("registration", async()=> {
        const data : LoginResponce = await authService.registration({dateOfBirth : "1", email : "1", gender : "1", password : "1"});
        const acc = (await accountService.get({target : AccountTarget.id, value : data.id}))[0];
        expect(acc.email).toBe("1");

        const accessPayload : ITokenPayload = tokenService.validateAccess(data.jwt.accessToken);
        expect(accessPayload.email).toBe("1");

        const refreshPayload : ITokenPayload = tokenService.validateRefersh(data.jwt.refreshToken);
        expect(refreshPayload.email).toBe("1");

        advanceTo(new Date(2022, 0, 1));

        try {
            const accessPayload : ITokenPayload = tokenService.validateAccess(data.jwt.accessToken);
            expect(accessPayload.email).toBe("1");   
            expect(accessPayload).toBe(null); 
        } catch(e) {

        }
    });

    it ("login", async()=> {
        await authService.registration({dateOfBirth : "1", email : "1", gender : "1", password : "1"});
        const data : LoginResponce = await authService.login({email : "1", password : "1"});  


        const accessPayload : ITokenPayload = tokenService.validateAccess(data.jwt.accessToken);
        expect(accessPayload.email).toBe("1");

        const refreshPayload : ITokenPayload = tokenService.validateRefersh(data.jwt.refreshToken);
        expect(refreshPayload.email).toBe("1");

        advanceTo(new Date(2022, 0, 1));

        try {
            const accessPayload : ITokenPayload = tokenService.validateAccess(data.jwt.accessToken);
            expect(accessPayload.email).toBe("1");   
            expect(accessPayload).toBe(null); 
        } catch(e) {

        }
    });

    it ("refresh", async()=> {
        const tokenResponse = await authService.registration({dateOfBirth : "1", email : "1", gender : "1", password : "1"});
        const data : LoginResponce = await authService.refresh(tokenResponse.jwt.refreshToken);  

        const accessPayload : ITokenPayload = tokenService.validateAccess(data.jwt.accessToken);
        expect(accessPayload.email).toBe("1");

        const refreshPayload : ITokenPayload = tokenService.validateRefersh(data.jwt.refreshToken);
        expect(refreshPayload.email).toBe("1");

        advanceTo(new Date(2022, 0, 1));

        try {
            const accessPayload : ITokenPayload = tokenService.validateAccess(data.jwt.accessToken);
            expect(accessPayload.email).toBe("1");   
            expect(accessPayload).toBe(null); 
        } catch(e) {

        }
    });
})