const express = require("express");
const userModel = require("../Models/User");
const { registerUser, loginUser } = require("../Controllers/Auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
