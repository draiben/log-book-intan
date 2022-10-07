const analis = localStorage.getItem("namaAnalis");
const namaAnalis = document.getElementById("nama");
namaAnalis.value = analis;

const d = new Date();
var hari = ("0" + d.getDate()).slice(-2);
var bulan = ("0" + (d.getMonth() + 1)).slice(-2);
var tahun = d.getFullYear();
var fullDate = tahun + "-" + bulan + "-" + hari;

document.getElementById("tglPerbaikan").value = fullDate;

form.addEventListener("submit", () => {
    const perbaikan = {
        nama: nama.value,
        tglPerbaikan: tglPerbaikan.value,
        tindakan: tindakan.value,
        jenisPerbaikan: jenisPerbaikan.value,
        statusAlat: statusAlat.value,
    };
    fetch("/api/perbaikan", {
        method: "POST",
        body: JSON.stringify(perbaikan),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            modalTitle.innerText = data.status;
            message.innerText = data.message;
        });
});
