const KEY_BELUM_SAMPAI = "belumSampai"
const KEY_SAMPAI = "sampai"

document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem(KEY_BELUM_SAMPAI)) {
        document.getElementById("belum-sampai").innerHTML +=
            localStorage.getItem(KEY_BELUM_SAMPAI);
        addCardEventListeners("belum-sampai");
    }
    if (localStorage.getItem(KEY_SAMPAI)) {
        document.getElementById("sampai").innerHTML +=
            localStorage.getItem(KEY_SAMPAI);
        addCardEventListeners("sampai");
    }

    document.getElementById("tambah").addEventListener("click", function (e) {
        e.preventDefault();
        let nama = document.getElementById("nama").value;
        let tanggal = document.getElementById("tanggal").value;

        if (nama && tanggal) {
            let card = createCard(nama, tanggal, "Belum Sampai");
            document.getElementById("belum-sampai").appendChild(card);
            addCardEventListeners("belum-sampai");
            updateLocalStorage();
        }
    });

    function addCardEventListeners(parentId) {
        let parentElement = document.getElementById(parentId);
        let cards = parentElement.getElementsByClassName("card");

        Array.from(cards).forEach((card) => {
            let statusButton = card.getElementsByClassName("btn")[0];
            let deleteButton = card.getElementsByClassName("btn-danger")[0];

            statusButton.addEventListener("click", function () {
                if (statusButton.innerText === "Belum Sampai") {
                    document.getElementById("sampai").appendChild(card);
                    statusButton.classList.remove("btn-warning");
                    statusButton.classList.add("btn-success");
                    statusButton.innerText = "Sampai";
                } else {
                    document.getElementById("belum-sampai").appendChild(card);
                    statusButton.classList.remove("btn-success");
                    statusButton.classList.add("btn-warning");
                    statusButton.innerText = "Belum Sampai";
                }
                updateLocalStorage();
            });

            deleteButton.addEventListener("click", function () {
                card.remove();
                updateLocalStorage();
            });
        });
    }

    function updateLocalStorage() {
        let belumSampaiCards = document.getElementById("belum-sampai").innerHTML;
        let sampaiCards = document.getElementById("sampai").innerHTML;

        belumSampaiCards = belumSampaiCards.replace("<h2>Belum Sampai</h2>", "");
        sampaiCards = sampaiCards.replace("<h2>Sampai</h2>", "");

        localStorage.setItem("belumSampai", belumSampaiCards);
        localStorage.setItem("sampai", sampaiCards);
    }

    function createCard(nama, tanggal, status) {
        let card = document.createElement("div");
        card.classList.add("card", "my-3");
        card.style.width = "18rem";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = nama;

        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = `Tanggal Tujuan: ${tanggal}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);

        let cardActions = document.createElement("div");
        cardActions.classList.add("card-body");

        let statusButton = document.createElement("button");
        statusButton.classList.add("btn");
        statusButton.innerText = status;

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "ms-2");
        deleteButton.innerText = "Hapus";

        if (status === "Belum Sampai") {
            statusButton.classList.add("btn-warning");
        } else {
            statusButton.classList.add("btn-success");
        }

        cardActions.appendChild(statusButton);
        cardActions.appendChild(deleteButton);
        card.appendChild(cardActions);

        return card;
    }
});