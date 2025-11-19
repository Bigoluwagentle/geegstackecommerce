const Product = require("../../models/product.model");

const getOneProduct = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        res.status(200).json({type: "success", message: "product fetched successfully", product})
    })
    .catch((err) => {
        res.status(500).json({type: "error", message: "Error fetching product details", errorMsg: err.message});
    })
}

module.exports = getOneProduct;