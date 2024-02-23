import * as jwt from "jsonwebtoken";
import { mainConfig } from "../../../config";
import { ITokenPayload,IJwtToken ,ITokenService } from "../../interfaces";


export class TokenService implements ITokenService{
    
    generateTokens (payload : ITokenPayload) : IJwtToken {
        return {
            accessToken : this.generateAccessToken(payload),
            refreshToken : this.generateRefreshToken(payload),
            accessExpired : mainConfig.auth.accessExpiredTime
        };
    }

    validateAccess (accessToken : string) : ITokenPayload | null {
        try {
            const userData = jwt.verify(accessToken,mainConfig.auth.accessTokenSalt) as ITokenPayload;
            return userData;
        } catch(e) {
            return null;
        }
    }
    validateRefersh (refreshToken : string) : ITokenPayload | null{
        try {
            const userData = jwt.verify(refreshToken,mainConfig.auth.refreshTokenSalt) as ITokenPayload;
            return userData;
        } catch(e) {
            return null;
        }
    }

   

    private generateAccessToken (payload : object) : string {
        return jwt.sign(payload, mainConfig.auth.accessTokenSalt, {
            expiresIn : mainConfig.auth.accessExpiredTime
        });
    } 
    private generateRefreshToken (payload : object) : string {
        return jwt.sign(payload, mainConfig.auth.refreshTokenSalt, {
            expiresIn : mainConfig.auth.refreshExpiredTime
        });
    } 
}