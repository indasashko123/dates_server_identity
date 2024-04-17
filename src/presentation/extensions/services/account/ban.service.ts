import { inject, injectable } from "inversify";
import { BanService, IBanRepository } from "../../../../app";

@injectable()
export class BanInjectableService extends BanService{
    
    constructor(@inject("IBanRepository") banRepository : IBanRepository) {
        super(banRepository);
    }
}