const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "Mohon masukkan email dan password anda" });
    else {
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) throw err;
            if (!result[0] || !(await bcrypt.compare(password, result[0].password))) return res.json({ status: "error", error: "Email atau password salah" });
            else {
                const token = jwt.sign({ id: result[0].id_user, nama: result[0].nama }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                });
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };
                db.query("SELECT * FROM spektrofotometer", async (e, hasil) => {
                    if (e) throw e;
                    else {
                        res.cookie("userLoggedIn", token, cookieOptions);
                        const id_alat = hasil[0].id_alat;

                        return res.json({ status: "success", success: "Berhasil Login", nama: result[0].nama, namaAlat: hasil[0].nama_alat, id_alat: id_alat });
                    }
                });
            }
        });
    }
};

module.exports = login;
