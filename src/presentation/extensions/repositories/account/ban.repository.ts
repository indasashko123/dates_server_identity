import { injectable } from "inversify";
import { BanRepository } from "../../../../../database";

@injectable()
export class BanInjectableRepository extends BanRepository  {
}