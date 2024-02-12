import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IRoleCreationAttribute } from "../../../app";




@Table({modelName : "role"})
export class RoleModel extends Model<RoleModel, IRoleCreationAttribute> {
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false,})
    name : string;
}