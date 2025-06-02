import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initModels } from "../models/init-models.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

initModels(sequelize);
