const db = require("../routes/db-config");

const home = async (req, res) => {
    const { alat, date } = req.body;

    const dateUnix = new Date(date).getTime();

    console.log(dateUnix);

    if (!alat || !date) return res.json({ status: "error", message: "Data tidak boleh kosong!" });
    else {
    }
};

module.exports = home;
