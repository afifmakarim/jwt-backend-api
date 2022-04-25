const { Products } = require("../models/associations");

const getAllProduct = async (req, res) => {
  try {
    res.status(200).send("Product Content.");
  } catch (error) {
    console.log(error);
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

    const response = { responseCode: "00", id: product.id };
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProduct, addProduct };
