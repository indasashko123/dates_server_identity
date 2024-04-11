import { injectable } from "inversify";
import { SessionRepository } from "../../../../../database";



@injectable()
export class SessionInjectableRepository extends SessionRepository{

}