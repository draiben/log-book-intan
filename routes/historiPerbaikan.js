const db = require("./db-config");
const jwt = require("jsonwebtoken");

const historiPerbaikan = async (req, res) => {
    const checkUser = req.cookies.userLoggedIn;

    const decodedUser = jwt.verify(checkUser, process.env.JWT_SECRET);

    if (checkUser) {
        db.query("SELECT users.nama, jenis_perbaikan.jenis_perbaikan, perbaikan.tgl_perbaikan, perbaikan.tindakan, perbaikan.status_alat FROM perbaikan INNER JOIN users INNER JOIN jenis_perbaikan WHERE perbaikan.id_user = users.id_user AND perbaikan.id_jenis_perbaikan = jenis_perbaikan.id_jenis_perbaikan ORDER BY perbaikan.tgl_perbaikan ASC", async (err, result) => {
            if (err) throw err;
            else {
                res.render("histori-perbaikan", { nama: decodedUser.nama, histori: result });
            }
        });
    } else {
        res.redirect("/");
    }
};

module.exports = historiPerbaikan;
