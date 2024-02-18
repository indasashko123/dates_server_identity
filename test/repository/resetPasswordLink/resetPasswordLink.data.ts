import { v4 } from "uuid";
import {IResetPasswordLinkCreationAttribute } from "../../../src/app";

export const resetPasswordLinkCreateDtos : IResetPasswordLinkCreationAttribute[] = [
    {
        accountId : v4(),
        link : v4()
    },
    {
        accountId : v4(),
        link : v4()
    },
    {
        accountId : v4(),
        link : v4()
    },
    {
        accountId : v4(),
        link : v4()
    },
    {
        accountId : v4(),
        link : v4()
    }
]