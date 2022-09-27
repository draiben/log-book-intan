const db = require("../routes/db-config");

const logBook = async (req, res) => {
    const { nama, alat, jenisPengujian, lamda, jenisSampel, kodeSampel, tglPemakaian, waktuMulai, waktuSelesai, statusAlat } = req.body;
    if (!nama || !alat || !jenisPengujian || !lamda || !jenisSampel || !kodeSampel || !tglPemakaian || !waktuMulai || !waktuSelesai || !statusAlat) {
        return res.json({ status: "error", error: "Data tidak boleh kosong" });
    } else {
        db.query("SELECT max(`id_pengujian`) as maxId FROM `pengujian`", async (err, result) => {});
    }
};

module.exports = logBook;
