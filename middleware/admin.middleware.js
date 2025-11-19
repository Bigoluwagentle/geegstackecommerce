const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const adminAuth = (req, res, next) => {
    const token = req["headers"].token;
    if(!token) {
        return res.status(401).json({type: "error", message: "Unauthorized"});
    }
    const key = token.split(" ")[1];
    if(!key) {
        return res.status(401).json({type: "error", message: "Unauthorized"});
    }
    try {
        const adminData = jwt.verify(key, process.env.SECRET_KEY);
        if(!adminData) {
            return res.status(401).json({type: "error", message: "Invalid header token"});
        }
        Admin.findById(adminData.id)
        .then((admin)=> {
            if(!admin) {
                return res.status(401).json({type: "error", message: "Invalid Token"});
            }
            next();
        })
        .catch((err) => {
            return res.status(401).json({type: "error", message: "Unauthorized"});
        })
    }
    catch(error){
        return res.status(401).json({type: "error", message: "Unauthorized"});
    }
}

module.exports = adminAuth;

