const Role = require("./role.model");
const RefreshToken = require("./refreshToken.model");
const User = require("./user.model");

User.hasOne(RefreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

RefreshToken.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

const ROLES = ["user", "admin", "moderator"];

module.exports = { Role, RefreshToken, User, ROLES };
