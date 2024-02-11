import { adminInitConfig } from "./adminInit.config";
import { authConfig } from "./auth.config";
import { clientConfig } from "./client.config";
import { dataBaseConfig } from "./db.config";
import { mailConfig } from "./mail.config";
import { oauthStrategyConfig } from "./oauthStrategy.config";
import { serverConfig } from "./server.config";



export const mainConfig = {
    database : dataBaseConfig,
    client : clientConfig,
    auth : authConfig,
    mail : mailConfig,
    server : serverConfig,
    authStrategy : oauthStrategyConfig,
    adminInitConfig : adminInitConfig
}