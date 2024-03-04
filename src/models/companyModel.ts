import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class Company extends Model {}

Company.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Company"
})