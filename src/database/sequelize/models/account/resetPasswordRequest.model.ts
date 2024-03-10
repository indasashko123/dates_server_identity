import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IResetPasswordRequestCreationAttribute } from "../../../../app";
import { ResetPasswordRequest } from "../../../../domain";



@Table({modelName : "reset-password-request"})
export class ResetPasswordRequestModel extends Model<ResetPasswordRequest, 
IResetPasswordRequestCreationAttribute> {

    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false,})
    accountId : string;

    @Column({type : DataType.STRING}) 
    endDate : string;
}