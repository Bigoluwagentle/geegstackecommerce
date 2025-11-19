
const Product = require("../../models/product.model");
const getAllProducts = (req, res) => {
    Product.find({})
    .then((products) => {
        res.status(200).json({type: "success", products, message: "Products retrieved successfully"});
    })
    .catch((err) => {
        res.status(500).json({type:"error", message: "Error fetching products", errorMsg: err.message});
    })
}

module.exports = getAllProducts;