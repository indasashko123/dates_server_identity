import {
        AccountRepository, AccountRoleRepository, ActivationRepository, 
        BanRepository, ResetPasswordRequestRepository, RoleRepository 
} from "./repositories";
import { ResetPasswordLinkRepository } from "./repositories/resetPasswordLink.repository";


export * from "./connection";
export * from "./repositories";
export * from "./models";

export const activationRepository = new ActivationRepository();
export const accountRoleRepository = new AccountRoleRepository();
export const roleRepository = new RoleRepository();
export const banRepository = new BanRepository();

export const accountRepository = new AccountRepository(
    roleRepository, accountRoleRepository
);

export const resetPasswordRequestRepository = new ResetPasswordRequestRepository(); 
export const resetPasswordLinkRepository = new ResetPasswordLinkRepository();