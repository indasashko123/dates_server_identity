import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IRoleCreationAttribute } from "../../../app";
import { Role } from "../../../domain";




@Table({modelName : "role"})
export class RoleModel extends Model<Role, IRoleCreationAttribute> {
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false,})
    name : string;
}