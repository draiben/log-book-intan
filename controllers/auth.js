const express = require("express");
const router = express.Router();

// Register & Login
const register = require("./register");
const login = require("./login");
const logout = require("./logout");

// LogBook
const logBook = require("./logBook");

// router login
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// router Logbook
router.post("/insert-logbook", logBook);

module.exports = router;
