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
    }).then((res) => res.json);
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
