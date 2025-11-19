const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    authCode: {type: Number},
    verified: {type: Boolean, default: false},
    dateJoined: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Admin", adminSchema);