var express = require("express");
var router = express.Router();
const { authJwt, uploadFile } = require("../middleware");
const {
  getAllProduct,
  addProduct,
} = require("../controllers/product.controller");

router.get("/products", [authJwt.verifyToken], getAllProduct);
router.post("/products", [authJwt.verifyToken, uploadFile], addProduct);

module.exports = router;
