import { Sequelize } from "sequelize-typescript";
import { 
  AccountModel, AccountRoleModel, 
  ActivationModel, BanModel, 
  ProfileModel, ResetPasswordLinkModel, 
  ResetPasswordRequestModel, RoleModel, 
  SessionModel} from '../../src/database';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging : false,
  models: [
    AccountModel,
    AccountRoleModel,
    ActivationModel,
    BanModel,
    ProfileModel,
    ResetPasswordLinkModel,         
    ResetPasswordRequestModel,
    RoleModel,
    SessionModel
],});

export const sync = async() => {
    await sequelize.sync({ force: true});
}