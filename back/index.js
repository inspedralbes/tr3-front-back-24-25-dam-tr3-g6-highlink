import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models/index.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

app.use("/uploads", express.static("uploads"));

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
