const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const checkUser = req.cookies.userLoggedIn;
    if (checkUser) {
        res.render("index", { status: "LoggedIn", nama: "asd" });
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

router.get("/insert-logbook", (req, res) => {
    res.render("log-book");
});

module.exports = router;
