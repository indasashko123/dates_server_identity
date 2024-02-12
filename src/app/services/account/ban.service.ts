import { Ban } from "../../../domain";
import { ApiError } from "../../../presentation/express/exceptions";
import { IBanCreationAttribute, IBanRepository, IBanService } from "../../interfaces";


export class BanService implements IBanService{
    
    constructor(private readonly banRepository : IBanRepository) {

    }

    async ban (data : IBanCreationAttribute) : Promise<Ban> {
        try { 
           const ban = await this.banRepository.create(data);
           return ban;
        } catch (e) {
            throw ApiError.InternalError(e);
        }
    }
}