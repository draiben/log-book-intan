const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const perbaikan = async (req, res) => {
    const { nama, tglPerbaikan, tindakan, jenisPerbaikan, statusAlat } = req.body;
    const idAlat = req.cookies.id_alat;
    const user = req.cookies.userLoggedIn;

    const decodedUser = jwt.verify(user, process.env.JWT_SECRET);

    console.log(decodedUser.id);
    var idJenisPerbaikan = "";
    if (jenisPerbaikan == "uji kinerja") {
        idJenisPerbaikan = "JP01";
    } else {
        idJenisPerbaikan = "JP02";
    }

    if (!nama || !tglPerbaikan || !tindakan || !jenisPerbaikan || !statusAlat) {
        return res.json({ status: "error", message: "Data tidak boleh kosong" });
    } else {
        db.query("SELECT max(CAST((substring(id_perbaikan, 6)) AS DECIMAL)) as maxId FROM `perbaikan`", async (err, result) => {
            if (err) throw err;
            else {
                // Get year
                var idPerbaikan = "";
                const getYear = new Date().getFullYear();

                // Cek ID
                if (!result[0].maxId) {
                    idPerbaikan += String("F" + getYear + 1);
                } else {
                    var oldId = result[0].maxId;
                    var firstId = "F";
                    idPerbaikan += String(firstId + getYear + ++oldId);
                }

                db.query(
                    "INSERT INTO perbaikan SET ? ",
                    {
                        id_perbaikan: idPerbaikan,
                        id_alat: idAlat,
                        id_jenis_perbaikan: idJenisPerbaikan,
                        id_user: decodedUser.id,
                        tgl_perbaikan: tglPerbaikan,
                        tindakan: tindakan,
                        status_alat: statusAlat,
                    },
                    async (error, results) => {
                        if (error) throw error;
                        else {
                            db.query("UPDATE jenis_perbaikan SET ? WHERE id_jenis_perbaikan = ?", [{ tgl_perbaikan: tglPerbaikan }, idJenisPerbaikan], async (e, hasil) => {
                                if (e) throw e;
                                else {
                                    console.log("success");
                                    return res.json({ status: "success", message: "Perbaikan telah di input!" });
                                }
                            });
                        }
                    }
                );
            }
        });
    }
};

module.exports = perbaikan;
