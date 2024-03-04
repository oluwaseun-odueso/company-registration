import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class Admin extends Model {}

Admin.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "Admin"
})