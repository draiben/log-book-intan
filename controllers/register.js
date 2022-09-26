const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) return res.json({ status: "error", error: "Mohon masukkan email dan password anda!" });
    else {
        db.query("SELECT email FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) throw err;
            if (results[0]) return res.json({ status: "error", error: "Email telah terdaftar" });
            else {
                // Menambahkan ID autoincrement
                db.query("SELECT max(`id_user`) as maxId FROM `users`", async (err, result) => {
                    // Get year
                    const getYear = new Date().getFullYear();
                    var newId = "";

                    // Cek ID
                    if (!result[0].maxId) {
                        newId += String("A" + getYear + 1);
                    } else {
                        var oldId = result[0].maxId;
                        var incrementId = oldId.substring(5);
                        var firstId = "A";
                        newId += String(firstId + getYear + ++incrementId);
                    }

                    // Hashing password
                    const Npassword = await bcrypt.hash(password, 8);

                    // Insert user to database
                    db.query("INSERT INTO users SET ?", { id_user: newId, nama: nama, email: email, password: Npassword }, async (error, result) => {
                        if (error) throw error;
                        return res.json({ status: "success", success: "Email berhasil didaftarkan, Silahkan login", anchor: '<a href="Login">Login</a>' });
                    });
                });
            }
        });
    }
};

module.exports = register;
