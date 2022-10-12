const db = require("./db-config");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
    const checkUser = req.cookies.userLoggedIn;
    if (checkUser) {
        db.query("SELECT * FROM jenis_perbaikan", async (error, results) => {
            if (error) throw error;
            else {
                const dateNow = new Date().getTime();

                // Uji Kinerja
                var tglKinerja = new Date(results[0].tgl_perbaikan);
                var getSixMonth = tglKinerja.getMonth() + 6;
                var nextKinerja = tglKinerja.setMonth(getSixMonth);

                // Kalibrasi
                var waktuPakai = results[1].waktu_pakai;
                var tglKalibrasi = new Date(results[1].tgl_perbaikan);
                var getTwoYears = tglKalibrasi.getMonth() + 24;
                var nextKalibrasi = tglKalibrasi.setMonth(getTwoYears);

                // peringatan
                var getDiffDay = 0;
                var status = "";
                if (nextKalibrasi > dateNow) {
                    var getDateNow = new Date(dateNow).getDate();
                    var getMonthNow = new Date(dateNow).getMonth();
                    var getYearNow = new Date(dateNow).getFullYear();

                    // peringatan kalibrasi
                    var getDateNextKalibrasi = new Date(nextKalibrasi).getDate();
                    var getMonthNextKalibrasi = new Date(nextKalibrasi).getMonth();
                    var getYearNextKalibrasi = new Date(nextKalibrasi).getFullYear();

                    // peringatan Kinerja
                    var getDateNextKinerja = new Date(nextKinerja).getDate();
                    var getMonthNextKinerja = new Date(nextKinerja).getMonth();
                    var getYearNextKinerja = new Date(nextKinerja).getFullYear();

                    if (getYearNow == getYearNextKalibrasi && getMonthNow == getMonthNextKalibrasi && getDateNextKalibrasi > getDateNow) {
                        getDiffDay += getDateNextKalibrasi - getDateNow;
                        status = "kalibrasi";
                    } else if (getYearNow == getYearNextKinerja && getMonthNow == getMonthNextKinerja && getDateNextKinerja > getDateNow) {
                        getDiffDay += getDateNextKinerja - getDateNow;
                        status = "uji kinerja";
                    }
                }
                console.log(status);

                // tidak layak
                if (dateNow >= nextKinerja && (dateNow >= nextKalibrasi || waktuPakai >= 2952000)) {
                    res.render("index", { status: "tidak layak", message: "Alat tidak layak, lakukan uji kinerja dan kalibrasi pada alat" });
                } else if (dateNow >= nextKinerja) {
                    res.render("index", { status: "tidak layak", message: "Alat tidak layak, lakukan uji kinerja pada alat" });
                } else if (dateNow >= nextKalibrasi || waktuPakai >= 2952000) {
                    res.render("index", { status: "tidak layak", message: "Alat tidak layak, lakukan kalibrasi pada alat" });
                } else if (getDiffDay < 7 && status) {
                    res.render("index", { status: "perlu diperbaiki", message: `Alat perlu diperbaiki, lakukan ${status} pada alat segera` });
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
