const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.user) {
        res.render("index", { status: "LoggedIn", user: req.user });
    } else {
        res.render("index", { status: "no", user: "nothing" });
    }
});

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public/" });
});

router.get("/login", (req, res) => {
    res.render("login", { status: "ok", message: "nothing" });
});

module.exports = router;
