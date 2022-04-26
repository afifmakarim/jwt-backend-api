var express = require("express");
var router = express.Router();
const { authJwt, uploadFile } = require("../middleware");
const {
  getAllProduct,
  addProduct,
  updateProduct,
  getProductById,
  deleteProductById,
} = require("../controllers/product.controller");

router.get("/products", [authJwt.verifyToken], getAllProduct);
router.get("/products/:id", [authJwt.verifyToken], getProductById);
router.post("/products", [authJwt.verifyToken, uploadFile], addProduct);
router.put("/products/:id", [authJwt.verifyToken, uploadFile], updateProduct);
router.delete("/products/:id", [authJwt.verifyToken], deleteProductById);

module.exports = router;
