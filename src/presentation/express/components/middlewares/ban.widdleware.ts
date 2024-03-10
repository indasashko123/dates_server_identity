import { NextFunction } from "express";
import { ExtendRequest } from "../../extensions";
import { banRepository } from "../../../../database";
import { BanTarget,ApiError } from "../../../../app";



export const banMiddleware = async (req : ExtendRequest ,res : Response, next : NextFunction)=> {
    try {
      const acc = req.account;
      const bans = await banRepository.get({target : BanTarget.userId, value : acc.id}); /// Использовать сервис а не репо
      const now = Date.now();
      bans.map (async (ban)=>{
        if (now < Number(ban.endDate)) {
            await banRepository.delete(ban.id);
        } else {
            return next(ApiError.Forbidden());
        }
      });
      return next();
    } catch(e) {
        return next(ApiError.InternalError(e));
    }
}