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

const params =
    new URLSearchParams(window.location.search);

const trainee =
    params.get("id");

document.getElementById("title").innerText =
    trainee;

loadHistory();

async function loadHistory() {

    const body =
        document.getElementById("historyBody");

    const snapshot =
        await getDocs(
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
}