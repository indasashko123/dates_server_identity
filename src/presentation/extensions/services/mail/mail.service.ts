import { injectable } from "inversify";
import { MailService } from "../../../../../app";

@injectable()
export class MailInjectableService extends MailService {
 
    constructor () {
       super();
    }

}