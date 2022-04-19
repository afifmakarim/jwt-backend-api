const db = require("../models");
const { parent_menu: Parent_menu } = db;

const createMenu = async (req, res) => {
  try {
    const { menuName, type, isActive } = req.body;
    const parent_menu = await Parent_menu.create({
      menuName,
      type,
      isActive,
    });
    return res.status(200).json({
      status: "00",
      data: parent_menu,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const parent_menu = await Parent_menu.findAll();
    if (parent_menu.length > 0) {
      return res.status(200).json({ status: "00", data: parent_menu });
    }
    return res.status(404).json({ message: "data not found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    const parent_menu = await Parent_menu.findOne({
      where: {
        id: id,
      },
    });
    if (parent_menu) {
      return res
        .status(200)
        .json({ status: "00", message: "-", data: parent_menu });
    }
    return res.status(404).json({ message: `id ${id} not found` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { menuName, type, isActive } = req.body;
    const [updated] = await Parent_menu.update(
      { menuName, type, isActive },
      {
        where: {
          id: id,
        },
      }
    );
    if (updated) {
      const updatedMenu = await Parent_menu.findOne({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ status: "00", message: "-", data: updatedMenu });
    }
    return res.status(404).json({ message: `id ${id} not found` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMenu = await Parent_menu.destroy({
      where: {
        id: id,
      },
    });
    if (deleteMenu) {
      return res.status(200).json({
        status: "00",
        message: `successfully deleted record id ${id}`,
      });
    }
    return res.status(404).json({ message: `id ${id} not found` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
};
