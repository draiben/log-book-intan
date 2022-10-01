const analis = localStorage.getItem("namaAnalis");
const nama_alat = localStorage.getItem("namaAlat");
const id_alat = localStorage.getItem("id_alat");

const namaAnalis = document.getElementById("nama");
namaAnalis.value = analis;

const namaAlat = document.getElementById("alat");
namaAlat.value = nama_alat;

const messsage = document.getElementById("messsage");

function optionJenisPengujian(e) {
    console.log(e.target.value);
    if (e.target.value == "Lain-lain") {
        document.getElementById("inputJenisPengujian").style.display = "block";
    } else {
        document.getElementById("inputJenisPengujian").style.display = "none";
    }
}

function optionJenisSampel(e) {
    console.log(e.target.value);
    if (e.target.value == "Lain-lain") {
        document.getElementById("inputJenisSampel").style.display = "block";
    } else {
        document.getElementById("inputJenisSampel").style.display = "none";
    }
}

form.addEventListener("submit", () => {
    var jenisSampel = "";
    var jenisPengujian = "";
    if (document.getElementById("jenisPengujian").value == "Lain-lain") {
        jenisPengujian += document.getElementById("inputJenisPengujian").value;
    } else {
        jenisPengujian += document.getElementById("jenisPengujian").value;
    }
    if (document.getElementById("jenisSampel").value == "Lain-lain") {
        jenisSampel += document.getElementById("inputJenisSampel").value;
    } else {
        jenisSampel += document.getElementById("jenisSampel").value;
    }

    const logBook = {
        nama: nama.value,
        alat: alat.value,
        jenisPengujian: jenisPengujian,
        lamda: lamda.value,
        jenisSampel: jenisSampel,
        kodeSampel: kodeSampel.value,
        tglPemakaian: tglPemakaian.value,
        waktuMulai: waktuMulai.value,
        waktuSelesai: waktuSelesai.value,
        statusAlat: statusAlat.value,
        id_alat: id_alat,
    };
    fetch("/api/insert-logbook", {
        method: "POST",
        body: JSON.stringify(logBook),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status == "error") {
                success.style.display = "none";
                error.style.display = "block";
                error.innerText = data.error;
            } else {
                error.style.display = "none";
                success.style.display = "block";
                success.innerText = data.message;
                message.innerText = data.message;
            }
        });
});
