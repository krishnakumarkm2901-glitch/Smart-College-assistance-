// Simple "Tip of the Day"
const tips = [
  "Revise for 25 minutes, break for 5. Repeat.",
  "Teach a topic to a friend to remember it better.",
  "Keep all your notes in one folder – digital or paper.",
  "Sleep at least 7 hours before important exams.",
  "Solve previous year question papers regularly."
];

const tipText = document.getElementById("tipText");
if (tipText) {
  const todayIndex = new Date().getDate() % tips.length;
  tipText.textContent = tips[todayIndex];
}

// Navigation between pages
const pages = document.querySelectorAll(".page");
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// Theme toggle (light/dark-ish)
const themeToggle = document.getElementById("themeToggle");
let lightMode = false;
themeToggle.addEventListener("click", () => {
  lightMode = !lightMode;
  document.body.style.background = lightMode
    ? "linear-gradient(135deg,#e0f2fe,#f9fafb)"
    : "";
  document.body.style.color = lightMode ? "#020617" : "";
  themeToggle.textContent = lightMode ? "🌙" : "☀️";
});

// Attendance calculator
const totalClasses = document.getElementById("totalClasses");
const attendedClasses = document.getElementById("attendedClasses");
const attendanceResult = document.getElementById("attendanceResult");

document.getElementById("calcAttendance").addEventListener("click", () => {
  const total = parseInt(totalClasses.value, 10);
  const attended = parseInt(attendedClasses.value, 10);
  if (!total || !attended || attended > total) {
    attendanceResult.textContent = "Please enter valid numbers.";
    attendanceResult.classList.remove("bad");
    return;
  }
  const percent = ((attended / total) * 100).toFixed(2);
  attendanceResult.textContent = `Your attendance is ${percent}%.`;
  if (percent < 75) {
    attendanceResult.classList.add("bad");
    attendanceResult.textContent += " You need to attend more classes!";
  } else {
    attendanceResult.classList.remove("bad");
  }
});

// CGPA calculator
const sgpaInput = document.getElementById("sgpaInput");
const cgpaResult = document.getElementById("cgpaResult");

document.getElementById("calcCgpa").addEventListener("click", () => {
  const values = sgpaInput.value.split(",").map(v => parseFloat(v.trim()));
  const valid = values.filter(v => !isNaN(v));
  if (!valid.length) {
    cgpaResult.textContent = "Enter at least one valid SGPA.";
    return;
  }
  const sum = valid.reduce((a, b) => a + b, 0);
  const cgpa = (sum / valid.length).toFixed(2);
  cgpaResult.textContent = `Your CGPA is ${cgpa}.`;
});

// Reminders with localStorage
const reminderInput = document.getElementById("reminderText");
const reminderList = document.getElementById("reminderList");
const STORAGE_KEY = "sca_reminders";

function loadReminders() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  reminderList.innerHTML = "";
  stored.forEach((text, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${text}</span>
      <button data-index="${index}">✕</button>
    `;
    reminderList.appendChild(li);
  });
}

document.getElementById("addReminder").addEventListener("click", () => {
  const text = reminderInput.value.trim();
  if (!text) return;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  stored.push(text);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  reminderInput.value = "";
  loadReminders();
});

reminderList.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const idx = e.target.dataset.index;
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    stored.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    loadReminders();
  }
});

document.getElementById("clearReminders").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  loadReminders();
});

// Load reminders on start
loadReminders();
