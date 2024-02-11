import { IJwtToken } from "../../interfaces";

export class LoginResponce {
    id : string;
    email : string;
    jwt : IJwtToken;
}