// === Модальное окно: теория (theoryModal) ===
const theoryModal = document.getElementById('theoryModal');
const openTheoryBtn = document.getElementById('openTheoryBtn');
const closeTheoryBtn = document.getElementById('closeTheoryBtn');

// === Модальное окно: практика (practiceModal) ===
const practiceModal = document.getElementById('practiceModal');
const openPracticeBtn = document.getElementById('openPracticeBtn');
const closePracticeBtn = document.getElementById('closePracticeBtn');

// === Модальное окно: пример (exampleModal) ===
const exampleModal = document.getElementById('exampleModal');
const openExampleBtn = document.getElementById('openExampleBtn');
const closeExampleBtn = document.getElementById('closeExampleBtn');

// --- Функции для теории ---
function openTheory() {
    if (theoryModal) theoryModal.style.display = 'flex';
}

function closeTheory() {
    if (theoryModal) theoryModal.style.display = 'none';
}

// --- Функции для практики ---
function openPractice() {
    if (practiceModal) practiceModal.style.display = 'flex';
}

function closePractice() {
    if (practiceModal) practiceModal.style.display = 'none';
}

// --- Функции для примера ---
function openExample() {
    if (exampleModal) exampleModal.style.display = 'flex';
}

function closeExample() {
    if (exampleModal) exampleModal.style.display = 'none';
}

// --- Назначение обработчиков (с проверкой существования элементов) ---
if (openTheoryBtn) openTheoryBtn.onclick = openTheory;
if (closeTheoryBtn) closeTheoryBtn.onclick = closeTheory;

if (openPracticeBtn) openPracticeBtn.onclick = openPractice;
if (closePracticeBtn) closePracticeBtn.onclick = closePractice;

if (openExampleBtn) openExampleBtn.onclick = openExample;
if (closeExampleBtn) closeExampleBtn.onclick = closeExample;

window.onclick = function (event) {
    if (theoryModal && event.target === theoryModal) {
        theoryModal.style.display = 'none';
    }
    if (practiceModal && event.target === practiceModal) {
        practiceModal.style.display = 'none';
    }
    if (exampleModal && event.target === exampleModal) {
        exampleModal.style.display = 'none';
    }
};


