import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IAccountCreationAttribute } from "../../../app";
import { Account } from "../../../domain";



@Table({modelName : "account"})
export class AccountModel extends Model<Account, IAccountCreationAttribute> {

    @Column({type : DataType.STRING, unique : true, primaryKey : true})
    id : string;

    @Column({type : DataType.STRING, unique : true,allowNull : false,})
    email : string;

    @Column({type : DataType.STRING, allowNull : false,})
    password : string;

    @Column({type : DataType.STRING, allowNull : false,})
    dateOfBirth : string;

    @Column({type : DataType.STRING, allowNull : false,})
    gender : string;

    @Column({type : DataType.BOOLEAN, defaultValue : false})
    isDeleted : boolean;
}