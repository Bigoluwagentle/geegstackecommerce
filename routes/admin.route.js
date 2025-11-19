const express = require("express");
const router = express.Router();

const createAccount = require("../controllers/admin/createaccount");
const login = require("../controllers/admin/login");
const verifyAccount = require("../controllers/admin/verifyaccount")

router.post("/admin", createAccount);
router.post("/admin/login", login);
router.post("/admin/verify", verifyAccount);

module.exports = router;