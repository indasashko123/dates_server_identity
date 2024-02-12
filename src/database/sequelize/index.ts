import { AccountRepository, AccountRoleRepository, ActivationRepository, BanRepository, RoleRepository } from "./repositories";


export * from "./connection";
export * from './models';
export * from "./repositories";





export const activationRepository = new ActivationRepository();
export const accountRoleRepository = new AccountRoleRepository();
export const roleRepository = new RoleRepository();
export const banRepository = new BanRepository();

export const accountRepository = new AccountRepository(
    roleRepository, accountRoleRepository
);