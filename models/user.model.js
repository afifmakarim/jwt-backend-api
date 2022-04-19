const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
