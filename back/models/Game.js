import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Game = sequelize.define("Game", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  player_1: { type: DataTypes.INTEGER, allowNull: false },
  player_2: { type: DataTypes.INTEGER, allowNull: false },
  max_height: { type: DataTypes.INTEGER },
  x_axis: { type: DataTypes.INTEGER },
});

export default Game;
