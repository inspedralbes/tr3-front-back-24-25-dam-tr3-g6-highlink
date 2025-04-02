import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { hashPassword } from "../routes/userRoutes.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
});

User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

export default User;
