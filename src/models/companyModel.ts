import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class Company extends Model {}

Company.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
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
  percentage: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "Company"
})