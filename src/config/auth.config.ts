import * as dotenv from 'dotenv';
dotenv.config();


export const authConfig = {
    accessTokenSalt : process.env.AUTH_ACCESS_TOKEN_SALT,
    refreshTokenSalt : process.env.AUTH_REFRESH_TOKEN_SALT,
    accessExpiredTime : process.env.AUTH_ACCESS_EXPIRED_TIME,
    refreshExpiredTime : process.env.AUTH_REFRESH_EXPIRED_TIME,
    salt_round : Number (process.env.AUTH_SALT_ROUND),
    privateKey : process.env.AUTH_PRIVATE_KEY,
    passwordSalt : process.env.AUTH_PASSWORD_SALT,
    passwordSaltRound : Number(process.env.AUTH_PASSWORD_SALT)
}