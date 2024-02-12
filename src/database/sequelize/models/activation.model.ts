import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IActivationCreationAttribute } from "../../../app";





@Table({modelName : "activation"})
export class ActivationModel extends Model<ActivationModel, IActivationCreationAttribute> {

    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false,})
    accountId : string;

    @Column({type : DataType.STRING, unique:true, allowNull : false,})
    link : string;

    @Column({type : DataType.BOOLEAN, defaultValue : false})
    isEmailConfirmed : boolean;
}