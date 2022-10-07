const express = require("express");
const router = express.Router();

// Register & Login
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const home = require("./home");
const perbaikan = require("./perbaikan");

// LogBook
const logBook = require("./logBook");

// router login
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/insert-logbook", logBook);
router.post("/", home);
router.post("/perbaikan", perbaikan);

module.exports = router;
