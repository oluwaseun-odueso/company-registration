import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "User"
})