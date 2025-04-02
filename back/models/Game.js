import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Game = sequelize.define("Game", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  player_1: { type: DataTypes.INTEGER },
  max_height: { type: DataTypes.INTEGER },
  x_player_1: { type: DataTypes.FLOAT },
  y_player_1: { type: DataTypes.FLOAT },
  x_player_2: { type: DataTypes.FLOAT },
  y_player_2: { type: DataTypes.FLOAT },
});

export default Game;
