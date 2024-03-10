import { Router } from "express";
import { authRouter } from "./auth.router";
import { confirmRouter } from "./confirm.router";
import { accountRouter } from "./account.router";
import { profileRouter } from "./profile.router";

export const router = Router();

router.use('/auth', authRouter);
router.use('/confirm', confirmRouter);
router.use('/account', accountRouter);
router.use('/profile', profileRouter);