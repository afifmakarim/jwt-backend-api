const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "roles",
  }
);

module.exports = Role;
