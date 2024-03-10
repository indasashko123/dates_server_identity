import { sync } from "./sequelize";

export * from "./sequelize";



export const connectDatabase = async() => {
    await sync();
}