const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 100},
    price: {type: Number, required: true},
    category: {type: String, required: true, enums: ["Gadget", "Accessory", "Grocery"] },
    description: {type: String, required: true},
    imageurl: [String],
    dateAdded: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Product", ProductSchema);