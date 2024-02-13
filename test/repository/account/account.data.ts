import * as uuid from "uuid";
import { IAccountCreationAttribute } from "../../../src/app";

export const accountCreateDtos : IAccountCreationAttribute[] = [
    {
        dateOfBirth : '01.01.01',
        email : "mail1@mail.ru",
        gender : 'man',
        id : uuid.v4(),
        password : "xxxxxxxx"
    },
    {
        dateOfBirth : '02.02.02',
        email : "mail2@mail.ru",
        gender : 'woman',
        id : uuid.v4(),
        password : "xxxxxxxx"
    },
    {
        dateOfBirth : '03.03.03',
        email : "mail3@mail.ru",
        gender : 'man',
        id : uuid.v4(),
        password : "xxxxxxxx"
    },
    {
        dateOfBirth : '04.04.04',
        email : "mail4@mail.ru",
        gender : 'man',
        id : uuid.v4(),
        password : "xxxxxxxx"
    },
    {
        dateOfBirth : '05.05.05',
        email : "mail5@mail.ru",
        gender : 'woman',
        id : uuid.v4(),
        password : "xxxxxxxx"
    }
]