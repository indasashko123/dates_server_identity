import { AccountRepository } from "./account.repository";
import { AccountRoleRepository } from "./accountRole.repository";
import { ActivationRepository } from "./activation.repository";
import { BanRepository } from "./ban.repository";
import { RoleRepository } from "./role.repository";

export * from "./account.repository";
export * from "./activation.repository";
export * from "./accountRole.repository";
export * from "./role.repository";


export const accountRepository = new AccountRepository();
export const activationRepository = new ActivationRepository();
export const accountRoleRepository = new AccountRoleRepository();
export const roleRepository = new RoleRepository();
export const banRepository = new BanRepository();