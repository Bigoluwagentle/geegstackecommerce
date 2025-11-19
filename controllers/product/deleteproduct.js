

const Product = require("../../models/product.model");

const deleteProduct = (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndDelete(productId)
    .then(() => {
        res.status(200).json({type: "success", message: "Product deleted successfully"});
    })
    .catch((err) => {
        res.status(500).json({type: "error", message: "Error deleting product", errorMsg: err.message});
    })

}

module.exports = deleteProduct;