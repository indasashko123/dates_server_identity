import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IProfileCreationAttribute } from "../../../app";
import { Profile } from "../../../domain";


@Table({modelName : "profile"})
export class ProfileModel extends Model<Profile, IProfileCreationAttribute> {
    
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false})
    name : string;

    @Column({type : DataType.STRING, allowNull : false})
    city : string;

    @Column({type : DataType.STRING, allowNull : false})
    search : string;

    @Column({type : DataType.TEXT, allowNull : false})
    about : string;    

    @Column({type :DataType.BOOLEAN, defaultValue : false})
    isDeleted : boolean
}