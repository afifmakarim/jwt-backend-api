module.exports = (sequelize, Sequelize) => {
  const Parent_menu = sequelize.define("parent_menus", {
    menuName: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  });

  return Parent_menu;
};
