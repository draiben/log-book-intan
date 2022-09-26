const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const loggedIn = (req, res, next) => {
    if (!req.cookies.userLoggedIn) return next();
    try {
        const decoded = jwt.verify(req.cookies.userLoggedIn, process.env.JWT_SECRET);
        db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) => {
            console.log(result);
            if (err) {
                return next();
            }
            req.user = result[0];
            return next();
        });
    } catch (error) {
        if (error) return next();
    }
};

module.exports = loggedIn;
