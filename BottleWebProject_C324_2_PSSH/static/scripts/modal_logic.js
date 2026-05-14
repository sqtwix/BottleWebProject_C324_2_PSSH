var theoryModal = document.getElementById('theoryModal');
var practiceModal = document.getElementById('practiceModal');
var openTheoryBtn = document.getElementById('openTheoryBtn');
var openPracticeBtn = document.getElementById('openPracticeBtn');
var closeTheoryBtn = document.getElementById('closeTheoryBtn');
var closePracticeBtn = document.getElementById('closePracticeBtn');

function openTheory() {
    if (theoryModal) {
        theoryModal.style.display = 'flex';
    }
}

function openPractice() {
    if (practiceModal) {
        practiceModal.style.display = 'flex';
    }
}

function closeTheory() {
    if (theoryModal) {
        theoryModal.style.display = 'none';
    }
}

function closePractice() {
    if (practiceModal) {
        practiceModal.style.display = 'none';
    }
}

if (openTheoryBtn) {
    openTheoryBtn.onclick = openTheory;
}

if (openPracticeBtn) {
    openPracticeBtn.onclick = openPractice;
}

if (closeTheoryBtn) {
    closeTheoryBtn.onclick = closeTheory;
}

if (closePracticeBtn) {
    closePracticeBtn.onclick = closePractice;
}

window.onclick = function(event) {
    if (theoryModal && event.target === theoryModal) {
        theoryModal.style.display = 'none';
    }
    if (practiceModal && event.target === practiceModal) {
        practiceModal.style.display = 'none';
    }
};