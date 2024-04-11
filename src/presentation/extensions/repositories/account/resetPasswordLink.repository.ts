import { injectable } from "inversify";
import { ResetPasswordLinkRepository } from "../../../../../database";

@injectable()
export class ResetPasswordLinkInjectableRepository extends ResetPasswordLinkRepository {
}