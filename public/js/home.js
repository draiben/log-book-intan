var table = document.getElementById("data-table");

var row = table.insertRow();
row.id = "row-1";
var cell1 = row.insertCell(0);
cell1.colSpan = 10;
cell1.innerText = "Nothing here";

// Form
form.addEventListener("submit", () => {
    const getArsip = {
        alat: alat.value,
        date: date.value,
    };

    fetch("/api/", {
        method: "POST",
        body: JSON.stringify(getArsip),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const rowData = document.querySelectorAll(".row-data");
            data.forEach((item, index) => {
                if (document.getElementById("row-1")) {
                    document.getElementById("row-1").remove();
                }
                if (rowData.length != 0) {
                    rowData.forEach((row) => {
                        row.remove();
                    });
                }
                var row = table.insertRow();
                row.classList.add("row-data");
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);
                var cell9 = row.insertCell(8);
                var cell10 = row.insertCell(9);
                cell1.innerText = index + 1;
                cell2.innerText = item.nama;
                cell3.innerText = item.jenis_pengujian;
                cell4.innerText = item.lamda;
                cell5.innerText = item.jenis_sampel;
                cell6.innerText = item.kode_sampel;
                cell7.innerText = item.tgl_pemakaian;
                cell8.innerText = item.waktu_mulai + "-" + item.waktu_selesai;
                cell9.innerText = item.status_alat;
                cell10.innerText = "Update";
            });
        });
});

const namaAnalis = localStorage.getItem("namaAnalis");
const namaAlat = localStorage.getItem("namaAlat");
const id_alat = localStorage.getItem("id_alat");

const nama = document.getElementById("nama_analis");
nama.innerText = namaAnalis;

const alat = document.getElementById("alat");
alat.value = namaAlat;

var logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.clear();
});

const cookieOptions = {
    expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
};

document.cookie = `id_alat=${id_alat}; secure`;

const tanggal = new Date();
var bulan = ("0" + (tanggal.getMonth() + 1)).slice(-2);
var tahun = tanggal.getFullYear();
var bulanTahun = tahun + "-" + bulan;

document.getElementById("date").value = bulanTahun;
