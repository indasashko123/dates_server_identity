import { IJwtToken, ITokenPayload } from "../../jwt";


export interface ITokenService {
    generateTokens (payload : ITokenPayload) : IJwtToken ;
    validateAccess (accessToken : string) : ITokenPayload | null ;
    validateRefersh (refreshToken : string) : ITokenPayload | null;
}

