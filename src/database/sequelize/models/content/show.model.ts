import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IShowCreationAttribute } from "../../../../app";
import { Show } from "../../../../domain";


@Table({modelName : "show"})
export class ShowModel extends Model<Show, IShowCreationAttribute> {
    
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;
 
    @Column ({type : DataType.STRING, allowNull : false})
    performerId : string;

    @Column({type : DataType.STRING, allowNull : false})
    subjectId : string;

    @Column({type : DataType.STRING, allowNull : false})
    result : string;
}