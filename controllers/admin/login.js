
const Admin = require("../../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({type: "error", message: "Email and password are required"});
    }

    Admin.findOne({email})
    .then(admin => {
        if (!admin) {
           return res.status(401).json({type: "error", message: "Admin account does not exist"});
        }

        const passwordsMatch = bcrypt.compareSync(password, admin.password);
        if(!passwordsMatch) {
            return res.status(401).json({type: "error", message: "Incorrect email or password"});
        } else if (!admin.verified) {
            return res.status(401).json({type: "error", message: "Admin account is not verified"});
        }

        const tokenPayload = {id: admin._id, email: admin.email};
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY);
        res.status(200).json({type: "success", message: "Logged in successfully", token})
    })
    .catch((err) => {
        res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
    })
}

module.exports = login;