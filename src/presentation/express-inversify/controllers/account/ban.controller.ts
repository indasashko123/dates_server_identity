import { inject, injectable } from "inversify";
import { IBanService } from "../../../../app";


@injectable()
export class BanController {
    constructor(
        @inject("IBanService") private banService: IBanService,
    ) {}
}