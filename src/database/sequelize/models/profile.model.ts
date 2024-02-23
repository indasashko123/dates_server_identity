import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IProfileCreationAttribute } from "../../../app";


@Table({modelName : "profile"})
export class ProfileModel extends Model<ProfileModel, IProfileCreationAttribute> {
    
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false})
    name : string;

    @Column({type : DataType.STRING, allowNull : false})
    city : string;

    @Column({type : DataType.STRING, allowNull : false})
    searchTarget : string;

    @Column({type : DataType.TEXT, allowNull : false})
    about : string;    
}