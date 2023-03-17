import { Sequelize } from "sequelize";

const db = new Sequelize("mri", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
