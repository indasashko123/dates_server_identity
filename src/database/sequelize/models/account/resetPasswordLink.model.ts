import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IResetPasswordLinkCreationAttribute } from "../../../../app";
import { ResetPasswordLink } from "../../../../domain";



@Table({modelName : "reset-password-link"})
export class ResetPasswordLinkModel extends Model<ResetPasswordLink, 
IResetPasswordLinkCreationAttribute> {

    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false,})
    accountId : string;

    @Column({type : DataType.STRING, allowNull : false, unique : true}) 
    link : string;

    @Column({type : DataType.BOOLEAN,defaultValue : false}) 
    isConfirmed : boolean;
}