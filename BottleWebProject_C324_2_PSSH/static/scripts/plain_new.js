/**
 * Баллистический калькулятор - обработка форм и UI
 */

let ballisticAnimation = null;

// Функция валидации и ограничения значений
function validateAndLimitInputs() {
    // Масса (0.5 - 50 кг)
    let mass = parseFloat(document.getElementById('mass').value);
    if (isNaN(mass)) mass = 1.0;
    mass = Math.max(0.5, Math.min(50, mass));
    document.getElementById('mass').value = mass.toFixed(2);
    
    // Коэффициент сопротивления (0.001 - 5)
    let drag = parseFloat(document.getElementById('drag').value);
    if (isNaN(drag)) drag = 0.1;
    drag = Math.max(0.001, Math.min(5, drag));
    document.getElementById('drag').value = drag.toFixed(4);
    
    // Скорость (10 - 100 м/с)
    let velocity = parseFloat(document.getElementById('velocity').value);
    if (isNaN(velocity)) velocity = 20;
    velocity = Math.max(10, Math.min(100, velocity));
    document.getElementById('velocity').value = velocity.toFixed(1);
    
    // Угол (10 - 80 градусов)
    let angle = parseFloat(document.getElementById('angle').value);
    if (isNaN(angle)) angle = 45;
    angle = Math.max(10, Math.min(80, angle));
    document.getElementById('angle').value = Math.round(angle);
    
    // Шаг времени (0.01 - 0.05)
    let deltaTime = parseFloat(document.getElementById('deltaTime').value);
    if (isNaN(deltaTime)) deltaTime = 0.02;
    deltaTime = Math.max(0.01, Math.min(0.05, deltaTime));
    document.getElementById('deltaTime').value = deltaTime.toFixed(3);
    
    return {
        mass: mass,
        drag: drag,
        velocity: velocity,
        angle: angle,
        deltaTime: deltaTime
    };
}

// Функция расчета
async function calculateTrajectory() {
    console.log("calculateTrajectory called");
    
    // Валидируем и получаем параметры
    const params = validateAndLimitInputs();
    console.log("Validated params:", params);
    
    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        
        const data = await response.json();
        console.log("Response data:", data);
        
        if (data.success) {
            // Обновляем результаты
            document.getElementById('maxHeight').innerHTML = data.max_height.toFixed(2) + ' м';
            document.getElementById('range').innerHTML = data.range.toFixed(2) + ' м';
            document.getElementById('flightTime').innerHTML = data.flight_time.toFixed(2) + ' с';
            document.getElementById('finalSpeed').innerHTML = data.final_speed.toFixed(2) + ' м/с';
            
            // Обновляем подписи на осях с реальными значениями
            updateAxesLabels(data.range, data.max_height);
            
            // Запускаем анимацию только если есть данные и не при загрузке
            if (ballisticAnimation && data.trajectory && data.trajectory.length > 0) {
                // Не запускаем анимацию при первом открытии
                if (window.isFirstLoad) {
                    window.isFirstLoad = false;
                    // Просто отрисовываем траекторию без анимации
                    ballisticAnimation.trajectory = data.trajectory;
                    ballisticAnimation.maxRange = Math.max(data.range, 10);
                    ballisticAnimation.maxHeight = Math.max(data.max_height, 10);
                    ballisticAnimation.scaleX = ballisticAnimation.width / ballisticAnimation.maxRange;
                    ballisticAnimation.scaleY = ballisticAnimation.height / ballisticAnimation.maxHeight;
                    ballisticAnimation.drawCoordinateSystem();
                    ballisticAnimation.drawFullTrajectory();
                } else {
                    ballisticAnimation.updateTrajectory(
                        data.trajectory,
                        data.range,
                        data.max_height
                    );
                }
            }
        } else {
            console.error('Ошибка:', data.error);
            // Не показываем alert при первой загрузке
            if (!window.isFirstLoad) {
                alert('Ошибка: ' + (data.error || 'Неизвестная ошибка'));
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        if (!window.isFirstLoad) {
            alert('Ошибка при соединении с сервером');
        }
    }
}

// Обновление подписей на осях
function updateAxesLabels(maxRange, maxHeight) {
    const canvas = document.getElementById('coordinateCanvas');
    const ctx = canvas.getContext('2d');
    
    // Сохраняем текущее состояние
    ctx.save();
    
    // Очищаем старые подписи (перерисовываем только подписи)
    // Подписи будут обновлены при следующей перерисовке
    
    ctx.restore();
}

// Сброс параметров
function resetParams() {
    document.getElementById('mass').value = '1.0';
    document.getElementById('drag').value = '0.1';
    document.getElementById('velocity').value = '20.0';
    document.getElementById('angle').value = '45';
    document.getElementById('deltaTime').value = '0.02';
    calculateTrajectory();
}

// Случайные параметры
async function randomAll() {
    try {
        const response = await fetch('/api/random-all');
        const data = await response.json();
        
        document.getElementById('mass').value = data.mass;
        document.getElementById('drag').value = data.drag;
        document.getElementById('velocity').value = data.velocity;
        document.getElementById('angle').value = data.angle;
        document.getElementById('deltaTime').value = data.deltaTime;
        
        calculateTrajectory();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Случайный параметр
async function randomParameter(target) {
    try {
        const response = await fetch(`/api/random/${target}`);
        const data = await response.json();
        document.getElementById(target).value = data.value;
        calculateTrajectory();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Сохранение в JSON
function saveToJSON() {
    const data = {
        mass: parseFloat(document.getElementById('mass').value),
        drag: parseFloat(document.getElementById('drag').value),
        velocity: parseFloat(document.getElementById('velocity').value),
        angle: parseFloat(document.getElementById('angle').value),
        deltaTime: parseFloat(document.getElementById('deltaTime').value)
    };
    
    const jsonStr = JSON.stringify(data, null, 4);
    const blob = new Blob([jsonStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projectile_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Загрузка из JSON
function loadFromJSON(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.mass !== undefined) document.getElementById('mass').value = data.mass;
                if (data.drag !== undefined) document.getElementById('drag').value = data.drag;
                if (data.velocity !== undefined) document.getElementById('velocity').value = data.velocity;
                if (data.angle !== undefined) document.getElementById('angle').value = data.angle;
                if (data.deltaTime !== undefined) document.getElementById('deltaTime').value = data.deltaTime;
                
                calculateTrajectory();
            } catch (err) {
                alert('Ошибка при загрузке JSON: ' + err.message);
            }
        };
        reader.readAsText(file);
    }
}

// Инициализация модальных окон
function initModals() {
    const theoryModal = document.getElementById('theoryModal');
    const practiceModal = document.getElementById('practiceModal');
    
    if (document.getElementById('openTheoryBtn')) {
        document.getElementById('openTheoryBtn').onclick = () => theoryModal.style.display = 'flex';
    }
    if (document.getElementById('closeTheoryBtn')) {
        document.getElementById('closeTheoryBtn').onclick = () => theoryModal.style.display = 'none';
    }
    if (document.getElementById('openPracticeBtn')) {
        document.getElementById('openPracticeBtn').onclick = () => practiceModal.style.display = 'flex';
    }
    if (document.getElementById('closePracticeBtn')) {
        document.getElementById('closePracticeBtn').onclick = () => practiceModal.style.display = 'none';
    }
    
    window.onclick = (event) => {
        if (event.target === theoryModal) theoryModal.style.display = 'none';
        if (event.target === practiceModal) practiceModal.style.display = 'none';
    };
}

// Добавление обработчиков ввода для ограничения значений
function addInputHandlers() {
    const inputs = ['mass', 'drag', 'velocity', 'angle', 'deltaTime'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('change', () => {
                validateAndLimitInputs();
                calculateTrajectory();
            });
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
    
    // Флаг для определения первого запуска
    window.isFirstLoad = true;
    
    // Создаем экземпляр анимации
    if (typeof BallisticAnimation !== 'undefined') {
        ballisticAnimation = new BallisticAnimation();
        console.log("Animation created:", ballisticAnimation);
    } else {
        console.error("BallisticAnimation class not found!");
    }
    
    // Добавляем обработчики ввода
    addInputHandlers();
    
    // Назначаем обработчики кнопок
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateTrajectory);
        console.log("Calculate button handler attached");
    }
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetParams);
    }
    
    const randomAllBtn = document.getElementById('randomAllBtn');
    if (randomAllBtn) {
        randomAllBtn.addEventListener('click', randomAll);
    }
    
    const saveJsonBtn = document.getElementById('saveJsonBtn');
    if (saveJsonBtn) {
        saveJsonBtn.addEventListener('click', saveToJSON);
    }
    
    const loadJsonBtn = document.getElementById('loadJsonBtn');
    if (loadJsonBtn) {
        loadJsonBtn.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
    }
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            loadFromJSON(e.target.files[0]);
        });
    }
    
    // Кнопки "Слч"
    document.querySelectorAll('.random-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            randomParameter(btn.getAttribute('data-target'));
        });
    });
    
    // Скролл к панели
    const scrollBtn = document.getElementById('scrollToInputsBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputsPanel = document.getElementById('inputsPanel');
            if (inputsPanel) {
                inputsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Инициализация модальных окон
    initModals();
    
    // Первоначальный расчет
    setTimeout(() => {
        console.log("Initial calculation");
        calculateTrajectory();
    }, 500);
});