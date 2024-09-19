import { DataSource } from "typeorm";
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: 'env/development.env' });

export const AppDataSource = new DataSource ({
    type: 'mysql',
    host: process.env.DB_HOST ,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME, // default is root user
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    logging: false,
    migrations: [join(__dirname, '../migration/*.{ts, js}' )],
    entities: [join(__dirname, '../entity/*.entity.{ts, js}' )],
    synchronize: false
    })
