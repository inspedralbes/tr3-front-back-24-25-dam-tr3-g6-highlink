import sequelize from "../config/database.js";
import User from "./User.js";
import Game from "./Game.js";

User.hasMany(Game, { foreignKey: "player_1" });
User.hasMany(Game, { foreignKey: "player_2" });
Game.belongsTo(User, { as: "Player1", foreignKey: "player_1" });
Game.belongsTo(User, { as: "Player2", foreignKey: "player_2" });

await sequelize.sync();

export { sequelize, User, Game };
