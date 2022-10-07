const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const checkUser = req.cookies.userLoggedIn;
    if (checkUser) {
        res.render("index", { data: [], status: "LoggedIn" });
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
    const checkUser = req.cookies.userLoggedIn;
    if (checkUser) {
        res.render("log-book");
    } else {
        res.redirect("/");
    }
});

router.get("/perbaikan", (req, res) => {
    const checkUser = req.cookies.userLoggedIn;
    if (checkUser) {
        res.render("form-perbaikan");
    } else {
        res.redirect("/");
    }
});

module.exports = router;
