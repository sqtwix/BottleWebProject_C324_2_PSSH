// --- Модальное окно: открытие / закрытие ---
const modal = document.getElementById('theoryModal');
const openBtn = document.getElementById('openTheoryBtn');
const closeBtn = document.getElementById('closeModalBtn');

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