const namaAnalis = localStorage.getItem("namaAnalis");
const namaAlat = localStorage.getItem("namaAlat");

const nama = document.getElementById("nama_analis");
nama.innerText = namaAnalis;

const alat = document.getElementById("alat");
alat.value = namaAlat;

var logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.clear();
});
