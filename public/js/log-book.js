const analis = localStorage.getItem("namaAnalis");
const nama_alat = localStorage.getItem("namaAlat");

const namaAnalis = document.getElementById("nama");
namaAnalis.value = analis;

const namaAlat = document.getElementById("alat");
namaAlat.value = nama_alat;

form.addEventListener("submit", () => {
    const logBook = {
        nama: nama.value,
        alat: alat.value,
        jenisPengujian: jenisPengujian.value,
        lamda: lamda.value,
        jenisSampel: jenisSampel.value,
        kodeSampel: kodeSampel.value,
        tglPemakaian: tglPemakaian.value,
        waktuMulai: waktuMulai.value,
        waktuSelesai: waktuSelesai.value,
        statusAlat: statusAlat.value,
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
                success.innerText = data.success;
            }
        });
});
