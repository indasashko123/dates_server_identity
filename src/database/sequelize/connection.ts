import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { mainConfig } from "../../config";
import { AccountModel } from "./models/account.model";
import { AccountRoleModel, 
        ActivationModel, 
        BanModel, 
        ResetPasswordRequestModel, 
        RoleModel } from "./models";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

export const sequelize = new Sequelize({
    database : mainConfig.database.databaseName,
    username : mainConfig.database.user,
    password : mainConfig.database.password ,
    host : mainConfig.database.host,
    port : Number(mainConfig.database.port),
    dialect : mainConfig.database.provider as Dialect,
    models: [
        AccountModel,
        ActivationModel,
        AccountRoleModel,
        RoleModel,
        BanModel,
        ResetPasswordRequestModel
    ],
    logging : false
});


export const sync = async() => {
    await sequelize.sync({ force: mainConfig.server.isDev});

    await RoleModel.create({
        name : mainConfig.adminInitConfig.userRoleName
    });

    await RoleModel.create({
        name : mainConfig.adminInitConfig.adminRoleName
    });
    const adminPass = await bcrypt.hash(mainConfig.adminInitConfig.adminPassword, mainConfig.auth.passwordSaltRound);
    await AccountModel.create({
       password : adminPass,
       dateOfBirth : "12.01.1990",
       email : mainConfig.adminInitConfig.adminEmail,
       gender : "man",
       id : uuid.v4()      
    });
}