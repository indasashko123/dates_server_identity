import { injectable } from "inversify";
import { MockMailService } from "../../../../../app/services/mail/mock.mail.service";


@injectable()
export class MockMailInjectableService extends MockMailService{
}