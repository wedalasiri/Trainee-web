// // import { initializeApp }
// // from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
// // import {
// // getFirestore,
// // collectionGroup,
// // getDocs
// // }
// // from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// // const firebaseConfig = {
// // apiKey: "AIzaSyDX9n_L5MsuTCP5FiBk9mbZtlpYj0MqRvM",
// // authDomain: "saudico-trainee.firebaseapp.com",
// // projectId: "saudico-trainee",
// // storageBucket: "saudico-trainee.firebasestorage.app",
// // messagingSenderId: "410401427797",
// // appId: "1:410401427797:web:0e84d5d249802f1dafdfdc",
// // measurementId: "G-3GSG5D6KSK"
// // };

// // const app = initializeApp(firebaseConfig);
// // const db = getFirestore(app);

// // let allRecords = []; // تخزين البيانات في الذاكرة للتصدير

// // window.onload = loadData;

// // // تحميل البيانات من Firestore
// // async function loadData() {
// // const table = document.getElementById("tableBody");
// // table.innerHTML = "";
// // allRecords = [];
// // console.log("Start Loading...");
// // try {
// // const snapshot = await getDocs(
// // collectionGroup(db, "records")
// //         );
// // console.log("Records count:", snapshot.size);
// // snapshot.forEach(doc => {
// // const data = doc.data();
// // allRecords.push(data);
// // table.innerHTML += `
// //                 <tr>
// //                     <td><input type="checkbox" class="rowCheck"></td>
// //                     <td>${data.employeeId || ""}</td>
// //                     <td>${data.fullName || ""}</td>
// //                     <td>${data.date || ""}</td>
// //                     <td>${data.checkIn || ""}</td>
// //                     <td>${data.checkOut || ""}</td>
// //                     <td>${data.status || ""}</td>
// //                     <td>${data.workLocation || ""}</td>
// //                 </tr>
// //             `;
// //         });
// // console.log("Finished Loading");
// //     } catch(error) {
// // console.error(error);
// //     }
// // }

// // // البحث بالرقم الوظيفي
// // document
// //     .getElementById("searchInput")
// //     .addEventListener("keyup", function () {
// // let value = this.value.toLowerCase();
// // let rows =
// // document.querySelectorAll("#tableBody tr");
// // rows.forEach(row => {
// // let employeeId =
// // row.cells[1].innerText.toLowerCase();
// // if (employeeId.includes(value)) {
// // row.style.display = "";
// //             } else {
// // row.style.display = "none";
// //             }
// //         });
// //     });

// // // تحديد الكل
// // document.getElementById("selectAll").addEventListener("change", function() {
// // document.querySelectorAll(".rowCheck").forEach(cb => {
// // cb.checked = this.checked;
// //     });
// // });

// // // تصدير البيانات المختارة فقط
// // document.getElementById("exportBtn").addEventListener("click", exportToCSV);

// // function exportToCSV() {
// // const rows = document.querySelectorAll("#tableBody tr");
// // const selected = [];

// // rows.forEach((row, index) => {
// // const checkbox = row.querySelector(".rowCheck");
// // if (checkbox && checkbox.checked) {
// // selected.push(allRecords[index]);
// //         }
// //     });

// // if (!selected.length) {
// // alert("Please select at least one record to export.");
// // return;
// //     }

// // const headers = ["Employee ID","Full Name","Date","Check In","Check Out","Status","Location"];
// // const csvRows = [headers.join(",")];

// // selected.forEach(data => {
// // const row = [
// // data.employeeId || "",
// // data.fullName || "",
// // data.date || "",
// // data.checkIn || "",
// // data.checkOut || "",
// // data.status || "",
// // data.workLocation || ""
// //         ];
// // csvRows.push(row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
// //     });

// // const csvContent = csvRows.join("\n");
// // const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
// // const url = URL.createObjectURL(blob);

// // const link = document.createElement("a");
// // link.href = url;
// // link.download = `attendance_selected_${new Date().toISOString().slice(0,10)}.csv`;
// // document.body.appendChild(link);
// // link.click();
// // document.body.removeChild(link);
// // URL.revokeObjectURL(url);
// // }
// import { initializeApp }
// from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// import {
//     getFirestore,
//     collection,
//     getDocs,
//     doc,
//     getDoc
// }
// from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDX9n_L5MsuTCP5FiBk9mbZtlpYj0MqRvM",
//     authDomain: "saudico-trainee.firebaseapp.com",
//     projectId: "saudico-trainee",
//     storageBucket: "saudico-trainee.firebasestorage.app",
//     messagingSenderId: "410401427797",
//     appId: "1:410401427797:web:0e84d5d249802f1dafdfdc",
//     measurementId: "G-3GSG5D6KSK"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// let allRecords = [];

// window.onload = loadData;

// async function loadData() {

//     const table = document.getElementById("tableBody");
//     table.innerHTML = "";
//     allRecords = [];

//     const today = new Date().toLocaleDateString(
//         "en-GB",
//         {
//             day: "2-digit",
//             month: "short",
//             year: "numeric"
//         }
//     ).replace(/ /g, " ");

//     const traineesSnapshot =
//         await getDocs(collection(db, "attendance"));

//     for (const traineeDoc of traineesSnapshot.docs) {

//         const traineeName = traineeDoc.id;

//         const todayRef = doc(
//             db,
//             "attendance",
//             traineeName,
//             "records",
//             today
//         );

//         const todaySnap = await getDoc(todayRef);

//         let traineeData = {
//             employeeId: traineeName,
//             fullName: traineeName,
//             date: today,
//             checkIn: "-",
//             checkOut: "-",
//             status: "Absent",
//             workLocation: "-"
//         };

//         if (todaySnap.exists()) {

//             const data = todaySnap.data();

//             traineeData = {
//                 employeeId: traineeName,
//                 fullName: data.fullName || traineeName,
//                 date: data.date || today,
//                 checkIn: data.checkIn || "-",
//                 checkOut: data.checkOut || "-",
//                 status: "Present",
//                 workLocation: data.workLocation || "-"
//             };
//         }

//         allRecords.push(traineeData);

//         table.innerHTML += `
//             <tr>
//                 <td>
//                     <input type="checkbox" class="rowCheck">
//                 </td>

//                 <td>${traineeData.employeeId}</td>

//                 <td>
//                     <a href="details.html?id=${encodeURIComponent(traineeName)}">
//                         ${traineeData.fullName}
//                     </a>
//                 </td>

//                 <td>${traineeData.date}</td>
//                 <td>${traineeData.checkIn}</td>
//                 <td>${traineeData.checkOut}</td>
//                 <td>${traineeData.status}</td>
//                 <td>${traineeData.workLocation}</td>

//             </tr>
//         `;
//     }
// }

// document
// .getElementById("searchInput")
// .addEventListener("keyup", function () {

//     let value = this.value.toLowerCase();

//     let rows =
//         document.querySelectorAll("#tableBody tr");

//     rows.forEach(row => {

//         let employeeId =
//             row.cells[1].innerText.toLowerCase();

//         row.style.display =
//             employeeId.includes(value)
//             ? ""
//             : "none";
//     });
// });

// document.getElementById("selectAll")
// .addEventListener("change", function () {

//     document.querySelectorAll(".rowCheck")
//     .forEach(cb => cb.checked = this.checked);

// });

// document.getElementById("exportBtn")
// .addEventListener("click", exportToCSV);

// function exportToCSV() {

//     const rows =
//         document.querySelectorAll("#tableBody tr");

//     const selected = [];

//     rows.forEach((row, index) => {

//         if (
//             row.querySelector(".rowCheck").checked
//         ) {
//             selected.push(allRecords[index]);
//         }
//     });

//     if (!selected.length) {

//         alert("Please select records");
//         return;
//     }

//     const headers = [
//         "Employee ID",
//         "Full Name",
//         "Date",
//         "Check In",
//         "Check Out",
//         "Status",
//         "Location"
//     ];

//     const csvRows = [headers.join(",")];

//     selected.forEach(data => {

//         csvRows.push([
//             data.employeeId,
//             data.fullName,
//             data.date,
//             data.checkIn,
//             data.checkOut,
//             data.status,
//             data.workLocation
//         ].join(","));
//     });

//     const blob =
//         new Blob(
//             [csvRows.join("\n")],
//             {type:"text/csv"}
//         );

//     const url =
//         URL.createObjectURL(blob);

//     const a =
//         document.createElement("a");

//     a.href = url;
//     a.download = "attendance.csv";
//     a.click();
// }

// // ================= FILTER =================

// document.getElementById("filterBtn")
// .addEventListener("click", async function () {

//     const dateValue =
//         document.getElementById("dateFilter").value;

//     if (!dateValue) {
//         alert("Please select a date");
//         return;
//     }

//     const table =
//         document.getElementById("tableBody");

//     table.innerHTML = "";
//     allRecords = [];

//     // تحويل التاريخ إلى نفس صيغة Firebase
//     const parts = dateValue.split("-");

//     const year = parts[0];
//     const month = parseInt(parts[1]) - 1;
//     const day = parseInt(parts[2]);

//     const months = [
//         "Jan","Feb","Mar","Apr","May","Jun",
//         "Jul","Aug","Sep","Oct","Nov","Dec"
//     ];

//     const selectedDate =
//         `${day} ${months[month]} ${year}`;

//     console.log("Searching:", selectedDate);

//     // جلب جميع المتدربين
//     const traineesSnapshot =
//         await getDocs(collection(db, "attendance"));

//     console.log("Trainees found:",
//         traineesSnapshot.size);

//     for (const traineeDoc of traineesSnapshot.docs) {

//         const traineeName = traineeDoc.id;

//         console.log("Checking:", traineeName);

//         const recordRef = doc(
//             db,
//             "attendance",
//             traineeName,
//             "records",
//             selectedDate
//         );

//         console.log("Path:", recordRef.path);

//         const recordSnap =
//             await getDoc(recordRef);

//         console.log(
//             "Exists:",
//             recordSnap.exists()
//         );

//         let traineeData = {
//             employeeId: traineeName,
//             fullName: traineeName,
//             date: selectedDate,
//             checkIn: "-",
//             checkOut: "-",
//             status: "Absent",
//             workLocation: "-"
//         };

//         if (recordSnap.exists()) {

//             const data = recordSnap.data();

//             traineeData = {
//                 employeeId: traineeName,
//                 fullName: data.fullName || traineeName,
//                 date: data.date || selectedDate,
//                 checkIn: data.checkIn || "-",
//                 checkOut: data.checkOut || "-",
//                 status: "Present",
//                 workLocation: data.workLocation || "-"
//             };
//         }

//         allRecords.push(traineeData);

//         table.innerHTML += `
//             <tr>
//                 <td>
//                     <input type="checkbox"
//                            class="rowCheck">
//                 </td>

//                 <td>${traineeData.employeeId}</td>

//                 <td>
//                     <a href="details.html?id=${encodeURIComponent(traineeName)}">
//                         ${traineeData.fullName}
//                     </a>
//                 </td>

//                 <td>${traineeData.date}</td>
//                 <td>${traineeData.checkIn}</td>
//                 <td>${traineeData.checkOut}</td>
//                 <td>${traineeData.status}</td>
//                 <td>${traineeData.workLocation}</td>
//             </tr>
//         `;
//     }
// });

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    collectionGroup,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDX9n_L5MsuTCP5FiBk9mbZtlpYj0MqRvM",
    authDomain: "saudico-trainee.firebaseapp.com",
    projectId: "saudico-trainee",
    storageBucket: "saudico-trainee.firebasestorage.app",
    messagingSenderId: "410401427797",
    appId: "1:410401427797:web:0e84d5d249802f1dafdfdc",
    measurementId: "G-3GSG5D6KSK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allRecords = [];

window.onload = loadData;


// ================= LOAD DATA =================

async function loadData() {

    const table = document.getElementById("tableBody");

    table.innerHTML = "";
    allRecords = [];

    const snapshot = await getDocs(
        collectionGroup(db, "records")
    );

    const traineesMap = {};

   // تاريخ اليوم بنفس تنسيق Firebase
const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
});

snapshot.forEach(docSnap => {

    const data = docSnap.data();

    if (!data.employeeId) return;

    // عرض سجلات اليوم فقط
    if (data.date !== today) return;

    // تخزين المتدرب مرة واحدة فقط
    if (!traineesMap[data.employeeId]) {

        traineesMap[data.employeeId] = data;

    } else {

        const oldDate =
            new Date(traineesMap[data.employeeId].date);

        const newDate =
            new Date(data.date);

        if (newDate > oldDate) {

            traineesMap[data.employeeId] = data;
        }
    }
});
if (Object.keys(traineesMap).length === 0) {

    table.innerHTML = `
        <tr>
            <td colspan="8">
                No attendance found for today
            </td>
        </tr>
    `;
    return;
}

    Object.values(traineesMap).forEach(data => {

        allRecords.push(data);

        table.innerHTML += `
            <tr>

                <td>
                    <input type="checkbox" class="rowCheck">
                </td>

                <td>${data.employeeId || ""}</td>

                <td>
                    <a href="details.html?id=${encodeURIComponent(data.fullName)}">
                        ${data.fullName || ""}
                    </a>
                </td>

                <td>${data.date || ""}</td>

                <td>${data.checkIn || "-"}</td>

                <td>${data.checkOut || "-"}</td>

                <td>${data.status || "Present"}</td>

                <td>${data.workLocation || "-"}</td>

            </tr>
        `;
    });
}


// ================= SEARCH =================

document.getElementById("searchInput")
.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows =
        document.querySelectorAll("#tableBody tr");

    let found = false;

    rows.forEach(row => {

        let employeeId =
            row.cells[1].innerText.toLowerCase();

        if (employeeId.includes(value)) {

            row.style.display = "";
            found = true;

        } else {

            row.style.display = "none";
        }
    });

    document.getElementById("noResults").style.display =
        found ? "none" : "block";
});



// ================= SELECT ALL =================

document.getElementById("selectAll")
.addEventListener("change", function () {

    document.querySelectorAll(".rowCheck")
    .forEach(cb => cb.checked = this.checked);

});


// ================= EXPORT =================

document.getElementById("exportBtn")
.addEventListener("click", exportToCSV);

async function exportToCSV() {

    const rows =
        document.querySelectorAll("#tableBody tr");

    let selectedNames = [];

    rows.forEach(row => {

        const checkbox =
            row.querySelector(".rowCheck");

        if (checkbox && checkbox.checked) {

            const fullName =
                row.cells[2].innerText.trim();

            selectedNames.push(fullName);
        }
    });

    if (!selectedNames.length) {

        alert("Please select trainees");
        return;
    }

    let csvRows = [];

    csvRows.push([
        "Employee ID",
        "Full Name",
        "Date",
        "Check In",
        "Check Out",
        "Status",
        "Location"
    ].join(","));

    for (const traineeName of selectedNames) {

        const snapshot = await getDocs(
            collection(
                db,
                "attendance",
                traineeName,
                "records"
            )
        );

        snapshot.forEach(doc => {

            const data = doc.data();

            csvRows.push([
                data.employeeId || "",
                data.fullName || "",
                data.date || "",
                data.checkIn || "",
                data.checkOut || "",
                data.status || "",
                data.workLocation || ""
            ].join(","));

        });
    }

    const blob = new Blob(
        [csvRows.join("\n")],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "attendance_history.csv";
    a.click();

    URL.revokeObjectURL(url);
}
// ================= FILTER =================

document.getElementById("filterBtn")
.addEventListener("click", async function () {

    const dateValue =
        document.getElementById("dateFilter").value;

    if (!dateValue) {

        alert("Please select a date");
        return;
    }

    const table =
        document.getElementById("tableBody");

    table.innerHTML = "";
    allRecords = [];

    const selectedDate =
        new Date(dateValue)
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    const snapshot = await getDocs(
        collectionGroup(db, "records")
    );

    snapshot.forEach(docSnap => {

        const data = docSnap.data();

        if (data.date === selectedDate) {

            allRecords.push(data);

            table.innerHTML += `
                <tr>

                    <td>
                        <input type="checkbox" class="rowCheck">
                    </td>

                    <td>${data.employeeId || ""}</td>

                    <td>
                        <a href="details.html?id=${encodeURIComponent(data.fullName)}">
                            ${data.fullName || ""}
                        </a>
                    </td>

                    <td>${data.date || ""}</td>

                    <td>${data.checkIn || "-"}</td>

                    <td>${data.checkOut || "-"}</td>

                    <td>${data.status || "Present"}</td>

                    <td>${data.workLocation || "-"}</td>

                </tr>
            `;
        }

    });

    if (table.innerHTML === "") {

        table.innerHTML = `
            <tr>
                <td colspan="8">
                    No attendance found
                </td>
            </tr>
        `;
    }

});