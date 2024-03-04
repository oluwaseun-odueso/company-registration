import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class UserA extends Model {}

UserA.init({
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfUsers: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  numberOfProducts: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  Percentage: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "UserA"
})