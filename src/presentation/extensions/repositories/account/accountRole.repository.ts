import { injectable } from "inversify";
import { AccountRoleRepository } from "../../../../../database";

@injectable()
export class AccountRoleInjectableRepository extends AccountRoleRepository {
}