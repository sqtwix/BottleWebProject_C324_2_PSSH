// Отрисовка графика 
function drawChart(x, T) {
    const canvas = document.getElementById('tempChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Устанавливаем реальные размеры canvas (чтобы не было размытия)
    const container = canvas.parentElement;
    const width = container.clientWidth - 40;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    if (!x || !T || x.length < 2) return;

    // Поля для осей
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    // Масштабирование
    const xMin = 0, xMax = Math.max(...x);
    const tMin = Math.min(...T), tMax = Math.max(...T);
    const tRange = tMax - tMin === 0 ? 1 : tMax - tMin;

    const scaleX = (val) => margin.left + (val / xMax) * plotWidth;
    const scaleY = (val) => margin.top + plotHeight - ((val - tMin) / tRange) * plotHeight;

    // Рисуем оси
    ctx.beginPath();
    ctx.strokeStyle = '#948979';
    ctx.fillStyle = '#DFD0B8';
    ctx.font = '12px sans-serif';

    // Ось X
    ctx.moveTo(margin.left, margin.top + plotHeight);
    ctx.lineTo(margin.left + plotWidth, margin.top + plotHeight);
    // Ось Y
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotHeight);
    ctx.stroke();

    // Подписи осей
    ctx.fillText('x (м)', width - 25, height - 5);
    ctx.fillText('T (°C)', 15, margin.top - 5);
    ctx.fillText('0', margin.left - 10, margin.top + plotHeight + 5);
    ctx.fillText(xMax.toFixed(1), margin.left + plotWidth - 10, margin.top + plotHeight + 15);
    ctx.fillText(tMin.toFixed(0), margin.left - 25, margin.top + plotHeight);
    ctx.fillText(tMax.toFixed(0), margin.left - 25, margin.top);

    // Рисуем линию графика
    ctx.beginPath();
    ctx.strokeStyle = '#DFD0B8';
    ctx.lineWidth = 2;
    for (let i = 0; i < x.length; i++) {
        const canvasX = scaleX(x[i]);
        const canvasY = scaleY(T[i]);
        if (i === 0) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();

    // Точки-узлы (не обязательно)
    ctx.fillStyle = '#DFD0B8';
    for (let i = 0; i < x.length; i++) {
        ctx.beginPath();
        ctx.arc(scaleX(x[i]), scaleY(T[i]), 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Отрисовка стержня цветными сегментами 
function drawRod(T) {
    const canvas = document.getElementById('rodCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = 80;
    canvas.width = width;
    canvas.height = height;

    const n = T.length;
    const segmentWidth = width / (n - 1);

    // Функция преобразования температуры в цвет (синий -> красный)
    const tMin = -50, tMax = 200;
    const getColor = (t) => {
        let norm = (t - tMin) / (tMax - tMin);
        norm = Math.min(1, Math.max(0, norm));
        const r = Math.floor(255 * norm);
        const b = Math.floor(255 * (1 - norm));
        return `rgb(${r}, 50, ${b})`;
    };

    for (let i = 0; i < n - 1; i++) {
        const x1 = i * segmentWidth;
        const x2 = (i + 1) * segmentWidth;
        const color = getColor((T[i] + T[i + 1]) / 2); // средняя температура на сегменте
        ctx.fillStyle = color;
        ctx.fillRect(x1, 0, x2 - x1, height);
    }
}

// Отправка запроса на расчёт 
async function calculate() {
    const length = document.getElementById('length').value;
    const tempLeft = document.getElementById('tempLeft').value;
    const tempRight = document.getElementById('tempRight').value;
    const nodes = document.getElementById('nodes').value;
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = '';

    try {
        const formData = new URLSearchParams();
        formData.append('length', length);
        formData.append('tempLeft', tempLeft);
        formData.append('tempRight', tempRight);
        formData.append('nodes', nodes);

        const response = await fetch('/api/heat/calculate/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            drawChart(data.x, data.T);
            drawRod(data.T);
        } else {
            errorDiv.textContent = data.error;
        }
    } catch (err) {
        errorDiv.textContent = 'Ошибка соединения с сервером';
    }
}

// Загрузка файла 
function setupFileUpload() {
    const loadBtn = document.getElementById('loadDataBtn');
    if (!loadBtn) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,.csv';
    fileInput.style.display = 'none';

    loadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('dataFile', file);

        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = '';

        try {
            const response = await fetch('/api/heat/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                document.getElementById('length').value = data.length;
                document.getElementById('tempLeft').value = data.tempLeft;
                document.getElementById('tempRight').value = data.tempRight;
                document.getElementById('nodes').value = data.nodes;
                // Автоматически запустить расчёт
                calculate();
            } else {
                errorDiv.textContent = data.error;
            }
        } catch (err) {
            errorDiv.textContent = 'Ошибка при загрузке файла';
        }
    });
}

// Инициализация 
document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn) calcBtn.addEventListener('click', calculate);
    setupFileUpload();
});