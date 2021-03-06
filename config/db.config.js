const Sequelize = require("sequelize");
require("dotenv").config();
const { log_error, log_info } = require("../utils/logger");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    const response = "Connection has been established successfully.";
    log_info("DB CONNECTION ", response);
    console.log(response);
  })
  .catch((err) => {
    log_error("DB CONNECTION", err.message);
    console.error("Unable to connect to the database:", err);
  });

module.exports = { sequelize };
