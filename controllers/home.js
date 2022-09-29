const db = require("../routes/db-config");

const home = async (req, res) => {
    const { alat, date } = req.body;

    const dateUnix = new Date(date).getTime();

    console.log(dateUnix);

    if (!alat || !date) return res.json({ status: "error", message: "Data tidak boleh kosong!" });
    else {
        db.query("SELECT pengujian.jenis_pengujian, pengujian.lamda, pengujian.jenis_sampel, pengujian.kode_sampel, pengujian.tgl_pemakaian, pengujian.waktu_mulai, pengujian.waktu_selesai, users.nama FROM pengujian INNER JOIN users ON pengujian.tgl_pemakaian = ? AND pengujian.id_user = users.id_user", [dateUnix], async (err, result) => {
            if (err) throw err;
            else {
                const { jenis_pengujian, lamda, jenis_sampel, kode_sampel, tgl_pemakaian, waktu_mulai, waktu_selesai, nama } = result[0];
                console.log(jenis_pengujian);
                return res.render("index", { data: result[0] });
            }
        });
    }
};

module.exports = home;
