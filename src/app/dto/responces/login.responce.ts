import { IJwtToken } from "../../interfaces/jwt";

export class LoginResponce {
    id : string;
    email : string;
    roles : string[];
    isActivated : boolean;
    jwt : IJwtToken;
}