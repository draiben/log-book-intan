const express = require("express");
const router = express.Router();

// Register & Login
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const home = require("./home");

// LogBook
const logBook = require("./logBook");

// router login
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// router Logbook
router.post("/insert-logbook", logBook);

// Home
router.post("/", home);

module.exports = router;
