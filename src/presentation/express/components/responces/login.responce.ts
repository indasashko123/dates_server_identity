import { IJwtToken } from "../../../../app/interfaces/jwt";

export class LoginResponce {
    id : string;
    email : string;
    jwt : IJwtToken;
}