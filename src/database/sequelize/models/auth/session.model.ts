import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ISessionCreationAttribute } from "../../../../app";
import { Session } from "../../../../domain";



@Table({modelName : "session"})
export class SessionModel extends Model<Session, ISessionCreationAttribute> {
    @Column({type : DataType.INTEGER, autoIncrement : true,unique : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false, unique : true})
    refreshToken : string;

    @Column({type : DataType.STRING, allowNull : false})
    fingerprint : string;
}