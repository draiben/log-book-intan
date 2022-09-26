const express = require("express");
const loggedIn = require("../controllers/loggedin");
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
    if (req.cookies.userLoggedIn) {
        res.render("index", { status: "LoggedIn", user: req.user });
    } else {
        res.render("login", { status: "no", user: "nothing" });
    }
});

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public/" });
});

router.get("/login", (req, res) => {
    res.render("login", { status: "ok", message: "nothing" });
});

module.exports = router;
