const db = require("../routes/db-config");

const home = async (req, res) => {
    const { alat, date } = req.body;

    if (!alat || !date) return res.json({ status: "error", message: "Data tidak boleh kosong!" });
    else {
        db.query(`SELECT users.nama, pengujian.jenis_pengujian, pengujian.lamda, pengujian.jenis_sampel, pengujian.kode_sampel, pengujian.tgl_pemakaian, pengujian.waktu_mulai, pengujian.waktu_selesai, pengujian.status_alat FROM pengujian INNER JOIN users WHERE pengujian.bulan_tahun = ?  AND pengujian.id_user = users.id_user ORDER BY tgl_pemakaian ASC`, [date], async (err, result) => {
            if (err) throw err;
            else {
                return res.json(result);
            }
        });
    }
};

module.exports = home;
