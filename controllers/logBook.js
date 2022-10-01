const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const logBook = async (req, res) => {
    const { nama, alat, jenisPengujian, lamda, jenisSampel, kodeSampel, tglPemakaian, waktuMulai, waktuSelesai, statusAlat } = req.body;
    const id_alat = req.cookies.id_alat;
    const id_user = req.cookies.userLoggedIn;
    const getYear = new Date().getFullYear();
    const bulan_tahun = tglPemakaian.substring(0, 7);

    console.log(bulan_tahun);

    const decodedUser = jwt.verify(id_user, process.env.JWT_SECRET);

    console.log(decodedUser);

    if (!nama || !alat || !jenisPengujian || !lamda || !jenisSampel || !kodeSampel || !tglPemakaian || !waktuMulai || !waktuSelesai || !statusAlat) {
        return res.json({ status: "error", error: "Data tidak boleh kosong" });
    } else {
        db.query("SELECT max(`id_pengujian`) as maxId FROM `pengujian`", async (e, result) => {
            if (e) throw e;
            else {
                // Get year
                var id_pengujian = "";

                // Cek ID
                if (!result[0].maxId) {
                    id_pengujian += String("T" + getYear + 1);
                } else {
                    var oldId = result[0].maxId;
                    var incrementId = oldId.substring(5);
                    var firstId = "T";
                    id_pengujian += String(firstId + getYear + ++incrementId);
                }
                db.query(
                    "INSERT INTO pengujian SET ?",
                    {
                        id_pengujian: id_pengujian,
                        id_user: decodedUser.id,
                        id_alat: id_alat,
                        jenis_pengujian: jenisPengujian,
                        lamda: lamda,
                        jenis_sampel: jenisSampel,
                        kode_sampel: kodeSampel,
                        tgl_pemakaian: tglPemakaian,
                        bulan_tahun: bulan_tahun,
                        waktu_mulai: waktuMulai,
                        waktu_selesai: waktuSelesai,
                    },
                    async (error, hasil) => {
                        if (error) return res.json({ status: "error", message: "Data tidak dapat disimpan" });
                        else {
                            return res.json({ status: "success", message: "Data berhasil disimpan" });
                        }
                    }
                );
            }
        });
    }
};

module.exports = logBook;
