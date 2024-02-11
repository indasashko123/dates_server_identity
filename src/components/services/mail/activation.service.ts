import { ActivationTarget, ApiError } from "../../../common";
import { activationRepository } from "../../../database";
import { ActivationCreateDto, ConfirmEmailDto } from "../../dto";




export class ActivationService {


    async createLink (dto : ActivationCreateDto) : Promise<string> {
        try {
            const activation = await activationRepository.create(dto);
            return activation.value;    
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }

    async confirmEmail(dto : ConfirmEmailDto) : Promise<void> {
        try {
            const activation = await activationRepository.get({
                target : ActivationTarget.value,
                value : dto.link
            });
            if (activation[0].value !== dto.link) {
                throw ApiError.BadRequest("Wrong activvation link");
            }
            activation[0].isEmailConfirmed = true;
            await activationRepository.update(activation[0]);
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }
}