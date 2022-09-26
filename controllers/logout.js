const logout = (req, res) => {
    res.clearCookie("userLoggedIn");
    res.redirect("/");
};

module.exports = logout;
