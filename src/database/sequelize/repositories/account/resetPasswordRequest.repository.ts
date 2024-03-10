import { 
    IResetPasswordRequestCreationAttribute, IResetPasswordRequestRepository, 
    ResetPasswordRequestTarget,ResetPasswordRequestQuerry } from "../../../../app";
import { ResetPasswordRequest } from "../../../../domain";
import { ResetPasswordRequestModel } from "../../models";

export class ResetPasswordRequestRepository implements IResetPasswordRequestRepository {
    async create (dto : IResetPasswordRequestCreationAttribute) : Promise<ResetPasswordRequest> {
        return await ResetPasswordRequestModel.create(dto) as ResetPasswordRequest;
    }
    async get(querry?: ResetPasswordRequestQuerry): Promise<ResetPasswordRequest[]> {
        if (!querry) {
            return await ResetPasswordRequestModel.findAll() as ResetPasswordRequest[];
        }
        if (querry.target === ResetPasswordRequestTarget.id) {
            return await ResetPasswordRequestModel.findAll({where : {id : querry.value}}) as ResetPasswordRequest[];
        }
        if (querry.target === ResetPasswordRequestTarget.accountId) {
            return await ResetPasswordRequestModel.findAll({where : {accountId : querry.value}}) as ResetPasswordRequest[];   
        }
        return await ResetPasswordRequestModel.findAll() as ResetPasswordRequest[];
    }

    async deleteByAccountId(accountId: string): Promise<boolean> {
        const del = await ResetPasswordRequestModel.destroy({where : {accountId}});
        if (!del) {
            return false;
        }    
        return true;
    }
}