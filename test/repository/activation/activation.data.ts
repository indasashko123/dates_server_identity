import { IActivationCreationAttribute } from "../../../src/app";
import { v4 } from "uuid";

export const activationCreateDtos : IActivationCreationAttribute[] = [
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