
const Product = require("../../models/product.model");

const editProduct = (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({type: "error", message: "Product id is required"});
    }

    Product.findById(productId)
    .then(product => {
        if (!product) {
            return res.status(400).json({type: "error", message: "product does not exist"});
        }

        const {name, price, description, category, images} = req.body;
        if (!name || !price || !description || !category || !images) { 
            return res.status(400).json({type: "error", message: "A required item is missing."});
        } else if (name.length > 100) {
            return res.status(400).json({type: "error", message: "Product name cannot exceed 100 characters"});
        } else if (category !== "Accessory" && category !== "Gadget" && category !== "Grocery") {
            return res.status(400).json({type: "error", message: "Invalid category"});
        } else if (isNaN(price)) {
            return res.status(400).json({type: "error", message: "Product price should be a number"});
        }

        const productData = {
            name,
            price,
            description,
            category,
            imageurl: images
        }
        Product.findByIdAndUpdate(productId, productData)
        .then(result => {
            res.status(200).json({type: "success", message: "Product updated successfully"});
        })
        .catch((err) => {
            res.status(500).json({type: "error", message: "Error updating product", errorMsg: err.message});
        })
    })
    .catch(err => {
        res.status(500).json({type: "error", message: "Error fetching product", errorMsg: err.message});
    })


}

module.exports = editProduct;