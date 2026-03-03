const modal = document.getElementById("medicineModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const form = document.getElementById("medicineForm");
const tableBody = document.getElementById("medicineTableBody");
const searchInput = document.getElementById("searchPatient");
const toast = document.getElementById("toast");

let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let editIndex = null;

openBtn.onclick = () => {
  editIndex = null;
  form.reset();
  modal.style.display = "flex";
};

closeBtn.onclick = () => (modal.style.display = "none");

function sortByTime() {
  medicines.sort((a, b) => a.time.localeCompare(b.time));
}

function getCurrentTime() {
  return new Date().toTimeString().slice(0, 5);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function renderTable(filter = "") {
  sortByTime();
  tableBody.innerHTML = "";

  const now = getCurrentTime();
  let upcomingMarked = false;

  const filtered = medicines.filter((m) =>
    m.patient.toLowerCase().includes(filter.toLowerCase()),
  );

  filtered.forEach((med, index) => {
    if (med.status === "Pending" && med.time < now) {
      med.status = "Overdue";
    }

    const row = document.createElement("tr");

    if (!upcomingMarked && med.status === "Pending" && med.time >= now) {
      row.classList.add("upcoming");
      upcomingMarked = true;
    }

    if (med.status === "Overdue") {
      row.classList.add("overdue-row");
    }

    row.innerHTML = `
      <td>${med.patient}</td>
      <td>${med.medicine}</td>
      <td>${med.dosage}</td>
      <td>${med.time}</td>
      <td>${med.status}</td>
      <td class="actions">
        <button class="done-btn"
          onclick="markDone(${index})"
          ${med.status === "Completed" ? "disabled" : ""}>
          ✓
        </button>
        <button class="edit-btn" onclick="editMedicine(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteMedicine(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  updateStats();
  localStorage.setItem("medicines", JSON.stringify(medicines));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newMedicine = {
    patient: patient.value,
    medicine: medicine.value,
    dosage: dosage.value,
    time: time.value,
    status: "Pending",
  };

  if (editIndex !== null) {
    medicines[editIndex] = newMedicine;
    editIndex = null;
    showToast("Updated successfully");
  } else {
    medicines.push(newMedicine);
    showToast("Added successfully");
  }

  renderTable(searchInput.value);
  form.reset();
  modal.style.display = "none";
});

function markDone(index) {
  medicines[index].status = "Completed";
  showToast("Marked as completed");
  renderTable(searchInput.value);
}

function deleteMedicine(index) {
  medicines.splice(index, 1);
  showToast("Deleted");
  renderTable(searchInput.value);
}

function editMedicine(index) {
  const med = medicines[index];
  patient.value = med.patient;
  medicine.value = med.medicine;
  dosage.value = med.dosage;
  time.value = med.time;
  editIndex = index;
  modal.style.display = "flex";
}

searchInput.addEventListener("input", () => {
  renderTable(searchInput.value);
});

function updateStats() {
  document.getElementById("totalCount").textContent = medicines.length;
  document.getElementById("completedCount").textContent = medicines.filter(
    (m) => m.status === "Completed",
  ).length;
  document.getElementById("pendingCount").textContent = medicines.filter(
    (m) => m.status === "Pending",
  ).length;
  document.getElementById("overdueCount").textContent = medicines.filter(
    (m) => m.status === "Overdue",
  ).length;
}

/* REAL TIME CLOCK */
function startClock() {
  function updateClock() {
    const now = new Date();
    document.getElementById("liveClock").textContent = now.toLocaleTimeString();
  }
  updateClock();
  setInterval(updateClock, 1000);
}

startClock();
renderTable();
