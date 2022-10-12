const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const logBook = async (req, res) => {
    const { nama, alat, jenisPengujian, lamda, jenisSampel, kodeSampel, tglPemakaian, waktuMulai, waktuSelesai, statusAlat } = req.body;
    const id_alat = req.cookies.id_alat;
    const id_user = req.cookies.userLoggedIn;
    const getYear = new Date().getFullYear();
    const bulan_tahun = tglPemakaian.substring(0, 7);

    const [hoursMulai, minuteMulai] = waktuMulai.split(":");
    const [hoursSelesai, minuteSelesai] = waktuSelesai.split(":");

    var secondMulai = Number(hoursMulai) * 60 * 60 + Number(minuteMulai) * 60;
    var secondSelesai = Number(hoursSelesai) * 60 * 60 + Number(minuteSelesai) * 60;

    var waktuPemakaian = secondSelesai - secondMulai;

    const decodedUser = jwt.verify(id_user, process.env.JWT_SECRET);

    if (!nama || !alat || !jenisPengujian || !lamda || !jenisSampel || !kodeSampel || !tglPemakaian || !waktuMulai || !waktuSelesai || !statusAlat) {
        return res.json({ status: "error", error: "Data tidak boleh kosong" });
    } else if (waktuPemakaian == 0 || secondSelesai < secondMulai) {
        return res.json({ status: "error", error: "Data waktu pemakaian salah" });
    } else {
        db.query("select max(CAST((substring(id_pengujian,6)) AS DECIMAL)) AS maxId from pengujian;", async (e, result) => {
            if (e) return res.json({ status: "error", error: "Kesalahan sistem!" });
            else {
                // Get year
                var id_pengujian = "";

                // Cek ID
                if (!result[0].maxId) {
                    id_pengujian += String("T" + getYear + 1);
                } else {
                    var oldId = result[0].maxId;
                    var firstId = "T";
                    id_pengujian += String(firstId + getYear + ++oldId);
                }
                db.query("SELECT waktu_pakai FROM jenis_perbaikan WHERE id_jenis_perbaikan = 'JP02' ", async (err, r) => {
                    if (err) return res.json({ status: "error", error: "Kesalahan sistem!" });
                    else {
                        var waktuPakai = r[0].waktu_pakai;
                        waktuPakai += waktuPemakaian;

                        db.query("UPDATE jenis_perbaikan SET waktu_pakai = ? WHERE id_jenis_perbaikan = 'JP02' ", [waktuPakai], async (er, results) => {
                            if (er) return res.json({ status: "error", error: "Kesalahan sistem!" });
                            else {
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
                                        status_alat: statusAlat,
                                    },
                                    async (error, hasil) => {
                                        if (error) return res.json({ status: "error", error: "Data tidak dapat disimpan" });
                                        else {
                                            return res.json({ status: "success", success: "Data berhasil disimpan" });
                                        }
                                    }
                                );
                            }
                        });
                    }
                });
            }
        });
    }
};

module.exports = logBook;
