import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Data = db.define(
  "mines",
  {
    sj: DataTypes.INTEGER,
    nopol: DataTypes.STRING,
    driver: DataTypes.STRING,
    site: DataTypes.STRING,
    transportir: DataTypes.STRING,
    berat: DataTypes.INTEGER,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  },
  {
    freezeTableName: true,
  }
);

export default Data;

(async () => {
  await db.sync();
})();
