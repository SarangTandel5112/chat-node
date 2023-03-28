import { DataSource } from "typeorm";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

`${path.join(__dirname, "../entities/*.js")}`

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'sarang',
    password: 'sarang@123',
    database: 'socket',
    synchronize: true,
    logging: false,
    entities: [`${path.join(__dirname, "../entities/*{.js,.ts}")}`],
    migrations: [`${path.join(__dirname, "../migrations/*{.js,.ts}")}`],
    subscribers: [`${path.join(__dirname, "../subscribers/*{.js,.ts}")}`]

})