import { ActivationTarget } from "../../enums";
import { ActivationCreateDto, ConfirmEmailDto } from "../../dto";
import { ApiError } from "../../../presentation/express/exceptions";
import { IActivationRepository, IActivationService } from "../../interfaces";
import { GetActivationQuerry } from "../../querry";
import { Activation } from "../../../domain";




export class ActivationService implements IActivationService {


    constructor (
        private readonly activationRepository : IActivationRepository
    ){}

    async createLink (dto : ActivationCreateDto) : Promise<string> {
        const activation = await this.activationRepository.create(dto);
        return activation.link;    
    }

    async confirmEmail(dto : ConfirmEmailDto) : Promise<void> {
        const activation = await this.activationRepository.get({
            target : ActivationTarget.link,
            value : dto.link
        });
        if (activation.length !== 1) {
            throw ApiError.BadRequest("Activation not found");    
        }
            
        if (activation[0].link !== dto.link) {
            throw ApiError.BadRequest("Wrong activvation link");
        }
        activation[0].isEmailConfirmed = true;
        await this.activationRepository.update(activation[0]);
    }

    async get(querry : GetActivationQuerry) : Promise<Activation[]> {
        return await this.activationRepository.get(querry);
    }
}