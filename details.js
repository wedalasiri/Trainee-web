import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDX9n_L5MsuTCP5FiBk9mbZtlpYj0MqRvM",
    authDomain: "saudico-trainee.firebaseapp.com",
    projectId: "saudico-trainee",
    storageBucket: "saudico-trainee.firebasestorage.app",
    messagingSenderId: "410401427797",
    appId: "1:410401427797:web:0e84d5d249802f1dafdfdc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const trainee = params.get("id");

document.getElementById("title").innerText = trainee;

loadHistory();

async function loadHistory() {

    const body = document.getElementById("historyBody");
    body.innerHTML = "";

    const snapshot = await getDocs(
        collection(
            db,
            "attendance",
            trainee,
            "records"
        )
    );

    snapshot.forEach(doc => {

        const data = doc.data();

        body.innerHTML += `
            <tr>
                <td>${data.date || ""}</td>
                <td>${data.checkIn || "-"}</td>
                <td>${data.checkOut || "-"}</td>
                <td>${data.status || "-"}</td>
                <td>${data.workLocation || "-"}</td>
            </tr>
        `;
    });

    enableSearch();
}

function enableSearch() {

    const searchInput =
        document.getElementById("searchInput");

    const noResults =
        document.getElementById("noResults");

    searchInput.addEventListener("keyup", () => {

        const value =
            searchInput.value.toLowerCase();

        const rows =
            document.querySelectorAll("#historyBody tr");

        let found = false;

        rows.forEach(row => {

            const date =
                row.cells[0].textContent.toLowerCase();

            if (date.includes(value)) {

                row.style.display = "";
                found = true;

            } else {

                row.style.display = "none";
            }

        });

        noResults.style.display =
            found ? "none" : "block";

    });
}

document
    .getElementById("exportBtn")
    .addEventListener("click", exportToCSV);

function exportToCSV() {

    let csv =
        "Date,Check In,Check Out,Status,Location\n";

    const rows =
        document.querySelectorAll("#historyBody tr");

    rows.forEach(row => {

        if (row.style.display !== "none") {

            const cols = row.querySelectorAll("td");

            const rowData = Array.from(cols)
                .map(col => `"${col.innerText}"`)
                .join(",");

            csv += rowData + "\n";
        }

    });

    const blob =
        new Blob([csv], { type: "text/csv" });

    const url =
        window.URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;
    a.download = `${trainee}_attendance.csv`;

    a.click();

    window.URL.revokeObjectURL(url);
}