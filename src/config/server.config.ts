import * as dotenv from 'dotenv';
dotenv.config();


export const serverConfig = {
    port : process.env.APP_PORT,
    isDev : Boolean(process.env.APP_IS_DEV),
    host : Boolean(process.env.APP_IS_DEV) ? `http://localhost:${process.env.APP_PORT}` : process.env.APP_HOST
}