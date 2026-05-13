// --- Модальное окно: открытие / закрытие ---
const modal = document.getElementById('theoryModal');
const openBtn = document.getElementById('openTheoryBtn');
const closeBtn = document.getElementById('closeTheoryBtn');

openBtn.onclick = () => {
    modal.style.display = 'flex';
};

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

const modalExample = document.getElementById('exampleModal');
const openBtnExample = document.getElementById('openExampleBtn');
const closeBtnExample = document.getElementById('closeExampleBtn');

openBtnExample.onclick = () => {
    modalExample.style.display = 'flex';
};

closeBtnExample.onclick = () => {
    modalExample.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modalExample) {
        modalExample.style.display = 'none';
    }
};