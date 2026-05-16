// Отрисовка графика 
function drawChart(x, T) {
    const canvas = document.getElementById('tempChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Адаптивный размер
    const container = canvas.parentElement;
    const width = container.clientWidth - 20;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    if (!x || !T || x.length < 2) return;

    // Отступы для осей
    const margin = { top: 25, right: 35, bottom: 45, left: 60 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const xMax = Math.max(...x);
    const tMin = Math.min(...T);
    const tMax = Math.max(...T);
    const tRange = (tMax - tMin) === 0 ? 1 : (tMax - tMin);

    const scaleX = (val) => margin.left + (val / xMax) * plotWidth;
    const scaleY = (val) => margin.top + plotHeight - ((val - tMin) / tRange) * plotHeight;

    // Рисуем сетку
    ctx.save();
    ctx.strokeStyle = '#3a3f47';
    ctx.fillStyle = '#DFD0B8';
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.lineWidth = 1;

    // Вертикальные линии и подписи X
    const xSteps = 5;
    for (let i = 0; i <= xSteps; i++) {
        const xVal = (i / xSteps) * xMax;
        const xCoord = scaleX(xVal);
        ctx.beginPath();
        ctx.moveTo(xCoord, margin.top);
        ctx.lineTo(xCoord, margin.top + plotHeight);
        ctx.stroke();
        ctx.fillText(xVal.toFixed(2), xCoord - 15, margin.top + plotHeight + 20);
    }

    // Горизонтальные линии и подписи Y
    const tSteps = 5;
    for (let i = 0; i <= tSteps; i++) {
        const tVal = tMin + (i / tSteps) * tRange;
        const yCoord = scaleY(tVal);
        ctx.beginPath();
        ctx.moveTo(margin.left, yCoord);
        ctx.lineTo(margin.left + plotWidth, yCoord);
        ctx.stroke();
        ctx.fillText(tVal.toFixed(0), margin.left - 35, yCoord + 4);
    }

    // Оси
    ctx.beginPath();
    ctx.strokeStyle = '#acb5b5';
    ctx.lineWidth = 2;
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotHeight);
    ctx.moveTo(margin.left, margin.top + plotHeight);
    ctx.lineTo(margin.left + plotWidth, margin.top + plotHeight);
    ctx.stroke();

    ctx.fillStyle = '#acb5b5';
    ctx.fillText('x (м)', margin.left + plotWidth - 10, margin.top + plotHeight + 35);
    ctx.fillText('T (°C)', margin.left - 40, margin.top - 5);

    // Линия графика
    ctx.beginPath();
    ctx.strokeStyle = '#DFD0B8';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < x.length; i++) {
        const canvasX = scaleX(x[i]);
        const canvasY = scaleY(T[i]);
        if (i === 0) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();

    // Точки-узлы
    ctx.fillStyle = '#DFD0B8';
    for (let i = 0; i < x.length; i++) {
        ctx.beginPath();
        ctx.arc(scaleX(x[i]), scaleY(T[i]), 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.restore();
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
        const color = getColor((T[i] + T[i + 1]) / 2);
        ctx.fillStyle = color;
        ctx.fillRect(x1, 0, x2 - x1, height);
    }
}

// Выделение поля с ошибкой 
function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('error-input');
    field.addEventListener('input', () => field.classList.remove('error-input'), { once: true });
}

// Отправка запроса на расчёт 
async function calculate() {
    // Сброс подсветки и сообщений
    document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = '';

    const length = document.getElementById('length').value;
    const tempLeft = document.getElementById('tempLeft').value;
    const tempRight = document.getElementById('tempRight').value;
    const nodes = document.getElementById('nodes').value;

    // Клиентская валидация с подсветкой
    let hasError = false;
    const l = parseFloat(length);
    if (isNaN(l) || l < 0.1 || l > 5) {
        highlightField('length');
        errorDiv.textContent += 'Длина должна быть от 0.1 до 5 м. ';
        hasError = true;
    }
    const tl = parseFloat(tempLeft);
    if (isNaN(tl) || tl < -50 || tl > 200) {
        highlightField('tempLeft');
        errorDiv.textContent += 'Левая температура от -50 до 200 °C. ';
        hasError = true;
    }
    const tr = parseFloat(tempRight);
    if (isNaN(tr) || tr < -50 || tr > 200) {
        highlightField('tempRight');
        errorDiv.textContent += 'Правая температура от -50 до 200 °C. ';
        hasError = true;
    }
    const n = parseInt(nodes);
    if (isNaN(n) || n < 2 || n > 200) {
        highlightField('nodes');
        errorDiv.textContent += 'Количество узлов от 2 до 200. ';
        hasError = true;
    }
    if (hasError) return;

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
        document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));

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