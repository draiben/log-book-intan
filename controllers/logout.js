const logout = (req, res) => {
    res.clearCookie("userLoggedIn");
    res.clearCookie("id");
    res.redirect("/");
};

module.exports = logout;
