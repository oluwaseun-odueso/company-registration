import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class UserB extends Model {}

UserB.init({
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
  modelName: "UserB"
})