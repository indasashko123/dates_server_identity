import { v4 } from "uuid";
import {IResetPasswordRequestCreationAttribute } from "../../../src/app";

export const resetPasswordRequestCreateDtos : IResetPasswordRequestCreationAttribute[] = [
    {
        accountId : v4(),
        endDate : "001"
    },
    {
        accountId : v4(),
        endDate : "001"
    },
    {
        accountId : v4(),
        endDate : "001"
    },
    {
        accountId : v4(),
        endDate : "001"
    },
    {
        accountId : v4(),
        endDate : "001"
    }
]