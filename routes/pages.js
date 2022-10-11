const express = require("express");
const router = express.Router();

const historiPerbaikan = require("./historiPerbaikan");
const home = require("./home");

router.get("/", home);

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

router.get("/histori-perbaikan", historiPerbaikan);

module.exports = router;
