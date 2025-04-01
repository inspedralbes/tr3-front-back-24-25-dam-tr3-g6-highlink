import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Game = sequelize.define("Game", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  max_height: { type: DataTypes.INTEGER },
});

export default Game;
