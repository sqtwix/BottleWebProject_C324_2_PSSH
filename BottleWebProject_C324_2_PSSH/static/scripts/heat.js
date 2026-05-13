// --- Простая смена цвета стержня (демо) ---
// Пока без логики, просто красивое изменение при нажатии кнопки "Рассчитать"
const calcButton = document.getElementById('calcBtn');
const rod = document.getElementById('rodVisual');
const leftTempInput = document.getElementById('tempLeft');
const rightTempInput = document.getElementById('tempRight');

calcButton.addEventListener('click', () => {
    // Демонстрация: меняем градиент стержня в зависимости от введённых температур
    let leftVal = parseFloat(leftTempInput.value) || 0;
    let rightVal = parseFloat(rightTempInput.value) || 0;
    // Ограничим яркость для наглядности
    let leftColor, rightColor;

    // Преобразуем температуру в RGB-оттенок (условно, только для демо)
    const tMin = -50, tMax = 200;
    let normLeft = Math.min(1, Math.max(0, (leftVal - tMin) / (tMax - tMin)));
    let normRight = Math.min(1, Math.max(0, (rightVal - tMin) / (tMax - tMin)));

    // Синий (холодно) -> Красный (горячо)
    const rLeft = Math.floor(255 * normLeft);
    const bLeft = Math.floor(255 * (1 - normLeft));
    const rRight = Math.floor(255 * normRight);
    const bRight = Math.floor(255 * (1 - normRight));

    rod.style.background = `linear-gradient(90deg, rgb(${rLeft}, 50, ${bLeft}), rgb(${rRight}, 50, ${bRight}))`;

    // Показать временное уведомление в графике (симуляция)
    const chartDiv = document.getElementById('chartPlaceholder');
    chartDiv.innerHTML = `
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="70" width="80" height="5" fill="#948979"/>
                    <polyline points="10,70 30,30 50,50 70,20 90,40" stroke="#DFD0B8" stroke-width="2" fill="none"/>
                    <circle cx="30" cy="30" r="3" fill="#DFD0B8"/>
                    <circle cx="70" cy="20" r="3" fill="#DFD0B8"/>
                </svg>
                <p style="margin-top: 10px;">Демо-режим: при вводе T<sub>L</sub>=${leftVal}°C, T<sub>R</sub>=${rightVal}°C стержень меняет цвет.<br>Полноценный график будет построен позже.</p>
            `;
});