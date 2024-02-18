import { v4 } from "uuid";
import { ResetPasswordLink, ResetPasswordRequest } from "../../../domain";
import { ApiError } from "../../../presentation/express/exceptions";
import { ChangePassDto } from "../../dto";
import { ResetPasswordLinkTarget, ResetPasswordRequestTarget } from "../../enums";
import { IPasswordService, IResetPasswordLinkRepository, IResetPasswordRequestRepository } from "../../interfaces";



export class PasswordService implements IPasswordService {
    
    constructor(
        private readonly resetPasswordRequestRepository : IResetPasswordRequestRepository,
        private readonly resetPasswordLinkRepository : IResetPasswordLinkRepository
    ) {}
    
    async createResetRequest (id : string) : Promise<ResetPasswordRequest> {
        const request = await this.resetPasswordRequestRepository.get({
            target : ResetPasswordRequestTarget.accountId, value : id});
        if (request.length !== 0) { 
            await this.deleteResetRequest(id);
        }
        const endDate = String(Date.now()+(86400000));
        return await this.resetPasswordRequestRepository.create({accountId : id, endDate });
    }
    async isRequestActive(dto: ChangePassDto): Promise<boolean> {
        const resetRequest = await this.resetPasswordRequestRepository.get({
            target : ResetPasswordRequestTarget.accountId, value : dto.accountId});
        if (!resetRequest || resetRequest.length !== 1) {
            throw ApiError.NotFound();
        }
        if (Number(resetRequest[0].endDate) > Date.now()) {
            throw ApiError.BadRequest("Time is out");
        }
        return true;
    }

    async deleteResetRequest(accountId: string): Promise<boolean> {
        return await this.resetPasswordRequestRepository.deleteByAccountId(accountId);    
    }

    async createResetLink( id : string) : Promise<ResetPasswordLink> {
        return await this.resetPasswordLinkRepository.create({
            accountId : id,
            link : v4()
        });
    }

    async getResetLink(link : string) : Promise<ResetPasswordLink> {
        return (await this.resetPasswordLinkRepository.get({target : ResetPasswordLinkTarget.link, value : link}))[0];
    }

    async confirmLink(link : ResetPasswordLink) : Promise<ResetPasswordLink> {
        link.isConfirmed = true;
        return await this.resetPasswordLinkRepository.update(link);
    }
}