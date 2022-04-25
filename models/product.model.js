const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Products = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
    },
    slugName: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "products",
  }
);

module.exports = Products;
