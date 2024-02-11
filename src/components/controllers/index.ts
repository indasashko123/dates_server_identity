import { AccountController } from "./account";
import { AuthController } from "./auth";
import { ConfirmController } from "./mail";






export const authController = new AuthController();
export const confirmController = new ConfirmController();
export const accountController = new AccountController();
