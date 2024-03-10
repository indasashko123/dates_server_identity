import {
        AccountRepository, AccountRoleRepository, ActivationRepository, 
        BanRepository, ResetPasswordRequestRepository, RoleRepository,ResetPasswordLinkRepository, 
        SessionRepository, ProfileRepository
    } from "./repositories";

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
export const sessionRepository = new SessionRepository();
export const profileRepository = new ProfileRepository();