import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class UserB extends Model {}

UserB.init({
  userId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "UserB"
})