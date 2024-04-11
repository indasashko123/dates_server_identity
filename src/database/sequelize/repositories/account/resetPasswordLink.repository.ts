import { 
    IResetPasswordLinkCreationAttribute, IResetPasswordLinkRepository, 
    GetResetPasswordLinkQuerry, ResetPasswordLinkTarget } from "../../../../app";
import { ResetPasswordLink } from "../../../../domain";
import { ResetPasswordLinkModel } from "../../models";


export class ResetPasswordLinkRepository implements IResetPasswordLinkRepository {
    async create (dto : IResetPasswordLinkCreationAttribute) : Promise<ResetPasswordLink> {
        return await ResetPasswordLinkModel.create(dto) as ResetPasswordLink;
    }
    async get(querry?: GetResetPasswordLinkQuerry): Promise<ResetPasswordLink[]> {
        if (querry.target === ResetPasswordLinkTarget.id) {
            return await ResetPasswordLinkModel.findAll({where : {id : querry.value}}) as ResetPasswordLink[];
        }
        if (querry.target === ResetPasswordLinkTarget.link) {
            return await ResetPasswordLinkModel.findAll({where : {link : querry.value}}) as ResetPasswordLink[];
        }
        return await ResetPasswordLinkModel.findAll({where : {accountId : querry.value}}) as ResetPasswordLink[];   
    }

    async update ( data : ResetPasswordLink) : Promise<ResetPasswordLink> {
        await ResetPasswordLinkModel.update({
            isConfirmed : data.isConfirmed,
        },{where : {id : data.id}});
        return await ResetPasswordLinkModel.findByPk(data.id) as ResetPasswordLink;
    }

    async deleteByAccountId(accountId: string): Promise<boolean> {
        const del = await ResetPasswordLinkModel.destroy({where : {accountId}});
        if (!del) {
            return false;
        }    
        return true;
    }
}
export const resetPasswordLinkRepository = new ResetPasswordLinkRepository();
