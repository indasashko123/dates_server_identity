import { Sequelize } from "sequelize-typescript";
import { AccountModel, AccountRoleModel, ActivationModel, RoleModel } from '../../src/database';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [
    AccountModel,
    ActivationModel,
    AccountRoleModel,
    RoleModel
],});

export const sync = async() => {
    await sequelize.sync({ force: true});
}