import { v4 } from "uuid";
import { IJwtToken, ITokenPayload, ITokenService, TokenService } from "../../../src/app"




describe("token service " , ()=> {
    let tokenService : ITokenService;
    beforeEach(async()=> {
       tokenService = new TokenService();
    });

    it("work", async()=> {
        const id = v4();
        const payload : ITokenPayload = {
        email : "johnySins@xxx.com",
        id,
        roles : ["USER","ACTOR"]
       }
       const tokens : IJwtToken = tokenService.generateTokens(payload);

       const verifyAccessPayload = tokenService.validateAccess(tokens.accessToken);
       const verifyRefreshPayload = tokenService.validateRefersh(tokens.refreshToken);

       expect(payload.id).toBe(verifyAccessPayload.id);
       expect(payload.email).toBe(verifyAccessPayload.email);
       expect(payload.roles[0]).toBe(verifyAccessPayload.roles[0]);
       expect(payload.roles[1]).toBe(verifyAccessPayload.roles[1]);
       expect(payload.id).toBe(verifyRefreshPayload.id);
       expect(payload.email).toBe(verifyRefreshPayload.email);
       expect(payload.roles[0]).toBe(verifyRefreshPayload.roles[0]);
       expect(payload.roles[1]).toBe(verifyRefreshPayload.roles[1]);
    });
})