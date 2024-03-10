import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

export class Image extends Model {}

Image.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "Image"
})