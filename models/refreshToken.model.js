const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/db.config");
const { DataTypes } = require("sequelize");
const config = require("../config/auth.config");

const RefreshToken = sequelize.define(
  "refreshToken",
  {
    token: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "refreshTokens",
  }
);

RefreshToken.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = uuidv4();

  let refreshToken = await this.create({
    token: _token,
    userId: user.id,
    expiryDate: expiredAt.getTime(),
  });

  return refreshToken.token;
};

RefreshToken.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

module.exports = RefreshToken;
