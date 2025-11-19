
const Admin = require("../../models/admin.model");

const verifyAccount = (req, res) => {
    const {email, authCode} = req.body;
    if (!email || !authCode){
        return res.status(400).json({type: "error", message: "Email and auth code are required"});
    }

    Admin.findOne({email})
    .then(admin => {
        if (!admin) {
           return res.status(401).json({type: "error", message: "Admin account does not exist"});
        }
        if (admin.authCode !== parseInt(authCode)) {
            return res.status(401).json({type: "error", message: "Incorrect email or auth code"});
        }
        Admin.findByIdAndUpdate(admin._id, {verified: true})
        .then(() => {
            res.status(200).json({type: "success", message: "Account verified successfully"});
        })
        .catch((err) => {
            res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
        });
    })
    .catch((err) => {
        res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
    })
}

module.exports = verifyAccount;