const db = require("./db-config");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
    const checkUser = req.cookies.userLoggedIn;
    if (checkUser) {
        db.query("SELECT * FROM jenis_perbaikan", async (error, results) => {
            if (error) throw error;
            else {
                const dateNow = new Date("2023-03-31");
                var getMonthNow = dateNow.getMonth();
                var getDateNow = dateNow.getDate();
                var getYearNow = dateNow.getFullYear();

                // Uji Kinerja
                var tglKinerja = new Date(results[0].tgl_perbaikan);
                var getSixMonth = tglKinerja.getMonth() + 6;
                tglKinerja.setMonth(getSixMonth);
                var dateSixMonth = tglKinerja.toISOString().substring(0, 10);
                var nextKinerja = new Date(dateSixMonth);
                var getMonthKinerja = nextKinerja.getMonth();
                var getDateKinerja = nextKinerja.getDate();
                var getYearKinerja = nextKinerja.getFullYear();

                // Kalibrasi
                var waktuPakai = results[1].waktu_pakai;
                var tglKalibrasi = new Date(results[1].tgl_perbaikan);
                var getTwoYears = tglKalibrasi.getMonth() + 24;
                tglKalibrasi.setMonth(getTwoYears);
                var twoYears = tglKalibrasi.toISOString().substring(0, 10);
                var nextKalibrasi = new Date(twoYears);
                var getMonthKalibrasi = nextKalibrasi.getMonth();
                var getDateKalibrasi = nextKalibrasi.getDate();
                var getYearKalibrasi = nextKalibrasi.getFullYear();

                var getDayKinerja = getDateKinerja - getDateNow;
                var warningKinerja = `Alat perlu uji kinerja sebelum tanggal ${dateSixMonth}`;

                // tidak layak
                if (getDateNow >= getDateKinerja && getMonthNow >= getMonthKinerja && getYearNow >= getYearKinerja && ((getDateNow >= getDateKalibrasi && getMonthNow >= getMonthKalibrasi && getYearNow >= getYearKalibrasi) || waktuPakai >= 2952000)) {
                    res.render("index", { status: "tidak layak", message: "Alat tidak layak, lakukan uji kinerja dan kalibrasi pada alat" });
                } else if (getDateNow >= getDateKinerja && getMonthNow >= getMonthKinerja && getYearNow >= getYearKinerja) {
                    res.render("index", { status: "tidak layak", message: "Alat tidak layak, lakukan uji kinerja pada alat" });
                } else if ((getDateNow >= getDateKalibrasi && getMonthNow >= getMonthKalibrasi && getYearNow >= getYearKalibrasi) || waktuPakai >= 2952000) {
                    res.render("index", { status: "tidak layak", message: "Alat tidak layak, lakukan kalibrasi pada alat" });
                }

                // Warning
                else if (getYearNow == getYearKinerja && getMonthNow == getMonthKinerja && getDayKinerja > 0 && getDayKinerja < 7) {
                    res.render("index", { status: "perlu diperbaiki", message: warningKinerja });
                } else {
                    res.render("index", { status: "layak", message: "Alat layak digunakan" });
                }
            }
        });
    } else {
        res.render("login", { status: "no", user: "nothing" });
    }
};

module.exports = home;
