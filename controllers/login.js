const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) return res.json({ status: "error", error: "Mohon masukkan email dan password anda" });
    else {
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) throw err;
            if (!result[0] || !(await bcrypt.compare(password, result[0].password))) return res.json({ status: "error", error: "Email atau password salah" });
            else {
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                });
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };

                res.cookie("userLoggedIn", token, cookieOptions);
                return res.json({ status: "success", success: "Berhasil Login" });
            }
        });
    }
};

module.exports = login;
