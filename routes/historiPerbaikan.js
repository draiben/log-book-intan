const db = require("./db-config");

const historiPerbaikan = async (req, res) => {
    const checkUser = req.cookies.userLoggedIn;

    if (checkUser) {
        db.query("SELECT users.nama, jenis_perbaikan.jenis_perbaikan, perbaikan.tgl_perbaikan, perbaikan.tindakan, perbaikan.status_alat FROM perbaikan INNER JOIN users INNER JOIN jenis_perbaikan ON perbaikan.id_user = users.id_user AND perbaikan.id_jenis_perbaikan = jenis_perbaikan.id_jenis_perbaikan ", async (err, result) => {
            if (err) throw err;
            else {
                res.render("histori-perbaikan", { histori: result });
            }
        });
    } else {
        res.redirect("/");
    }
};

module.exports = historiPerbaikan;
