import { AccountController } from "./account";
import { AuthController } from "./auth";
import { ConfirmController } from "./mail";
import { ProfileController } from "./content";





export const authController = new AuthController();
export const confirmController = new ConfirmController();
export const accountController = new AccountController();
export const profileController = new ProfileController();
