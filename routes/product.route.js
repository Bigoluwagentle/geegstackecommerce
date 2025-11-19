const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/admin.middleware");

const createProduct = require("../controllers/product/createproduct");
const getAllProducts = require("../controllers/product/getAllProducts");
const getOneProduct = require("../controllers/product/getOneProduct");
const editProduct = require("../controllers/product/editproduct");
const deleteProduct = require("../controllers/product/deleteproduct");

router.post("/products", adminAuth, createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getOneProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;