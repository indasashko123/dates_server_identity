import { injectable } from "inversify";
import { ResetPasswordRequestRepository } from "../../../../../database";


@injectable()
export class ResetPasswordRequestInjectableRepository extends ResetPasswordRequestRepository {
}