import { Sequelize } from "sequelize-typescript";
import { AccountModel, AccountRoleModel, ActivationModel, BanModel, ResetPasswordLinkModel, ResetPasswordRequestModel, RoleModel } from '../../src/database';
import { ResetPasswordRequest } from "../../src/domain";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging : false,
  models: [
    AccountModel,
    ActivationModel,
    AccountRoleModel,
    RoleModel,
    BanModel,
    ResetPasswordLinkModel,
    ResetPasswordRequestModel
],});

export const sync = async() => {
    await sequelize.sync({ force: true});
}