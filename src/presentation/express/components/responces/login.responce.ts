import { IJwtToken } from "../../interfaces/jwt";

export class LoginResponce {
    id : string;
    email : string;
    jwt : IJwtToken;
}