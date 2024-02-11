import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IProfileCreationAttribute } from "../../../interfaces/creationAttibutes";


@Table({modelName : "profile"})
export class ProfileModel extends Model<ProfileModel, IProfileCreationAttribute> {
    
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;

}