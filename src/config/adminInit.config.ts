import * as dotenv from 'dotenv';
dotenv.config();

export const adminInitConfig = {
    adminRoleName :  process.env.ADMIN_ROLE_NAME,
    userRoleName : process.env.ADMIN_USER_ROLE_NAME,
    adminEmail : process.env.ADMIN_EMAIL, 
    adminPassword : process.env.ADMIN_PASSWORD
}