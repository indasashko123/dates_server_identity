import { Router } from "express";
import { authRouter } from "./auth.router";
import { accountRouter } from "./account.router";

export const router = Router();

router.use('/auth', authRouter);
router.use('/account', accountRouter);