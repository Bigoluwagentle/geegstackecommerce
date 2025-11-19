const Product = require("../../models/product.model");
const path = require("path");

const createProduct = (req, res) => {
    console.log(req.files.images)
    const {name, price, description, category} = req.body;
    if (!name || !price || !description || !category) { 
        return res.status(400).json({type: "error", message: "A required item is missing."});
    } else if (name.length > 100) {
        return res.status(400).json({type: "error", message: "Product name cannot exceed 100 characters"});
    } else if (category !== "Accessory" && category !== "Gadget" && category !== "Grocery") {
        return res.status(400).json({type: "error", message: "Invalid category"});
    } else if (isNaN(price)) {
        return res.status(400).json({type: "error", message: "Product price should be a number"});
    } else if (!req.files || !req.files.images) {
        return res.status(400).json({type: "error", message: "Product image is required"});
    }

    const productData = {
        name,
        price,
        description,
        category
    }

    Product.create(productData)
    .then(result => {
        const image = req.files.images;
        const imageName = result._id + "." + path.extname(image.name);
        image.mv("./assets/product_images/" + imageName, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({type: "error", message: "Error uploading product image"});
            }
            Product.findByIdAndUpdate(result._id, {imageurl: [imageName]})
            .then(() => {
                res.status(201).json({type: "success", message: "Product created successfully", productId: result._id});
            })
            .catch(err => {
                res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
            })
        })
    })
    .catch(err => {
        res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
    })

}

module.exports = createProduct;