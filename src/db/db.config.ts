import { DataSource } from "typeorm";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

`${path.join(__dirname, "../entities/*.js")}`

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: "chat-db.clxg76oyi24f.eu-north-1.rds.amazonaws.com",
    port: 5432,
    username: 'sarang',
    password: 'sarang123',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [`${path.join(__dirname, "../entities/*{.js,.ts}")}`],
    migrations: [`${path.join(__dirname, "../migrations/*{.js,.ts}")}`],
    subscribers: [`${path.join(__dirname, "../subscribers/*{.js,.ts}")}`]

})