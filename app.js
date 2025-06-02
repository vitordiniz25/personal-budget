import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { sequelize } from "./infra/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the API!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  await sequelize.sync({ alter: true });
  console.log("Database synchronized successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
