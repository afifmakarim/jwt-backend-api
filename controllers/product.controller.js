const { Products } = require("../models/associations");
const { log_error, log_info } = require("../utils/logger");

const getAllProduct = async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ["id", "name", "slugName", "imageUrl", "isActive"],
    });

    if (!products) {
      const response = { status: "05", message: "failed to get product data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success",
      data: products,
    };

    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const addProduct = async (req, res) => {
  const { name, slugName, isActive } = req.body;
  try {
    if (!req.file) {
      return res.status(404).json({ message: "Image not found" });
    }

    const product = await Products.create({
      name,
      slugName,
      isActive,
      imageUrl: `images/${req.file.filename}`,
    });

    if (!product) {
      const response = {
        status: "05",
        message: "failed to create product data",
      };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = { responseCode: "00", id: product.id };
    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, slugName, isActive } = req.body;
  try {
    if (!req.file) {
      return res.status(404).json({ message: "Image not found" });
    }

    const product = await Products.update(
      {
        name,
        slugName,
        isActive,
        imageUrl: `images/${req.file.filename}`,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!product) {
      const response = {
        status: "05",
        message: "failed to update product data",
      };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = { responseCode: "00", id: product.id };
    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Products.findOne({
      attributes: ["id", "name", "slugName", "imageUrl", "isActive"],
      where: { id: id },
    });

    if (!products) {
      const response = {
        status: "05",
        message: `failed to get product data ${id}`,
      };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = { responseCode: "00", message: "success", data: products };
    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Products.destroy({
      where: {
        id: id,
      },
    });

    if (!products) {
      const response = {
        status: "05",
        message: `failed to delete product data ${id}`,
      };
      log_error(req.method, response);
      res.status(500).send(response);
      return;
    }

    const response = { responseCode: "00", message: "success", data: products };
    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

module.exports = {
  getAllProduct,
  addProduct,
  updateProduct,
  getProductById,
  deleteProductById,
};
