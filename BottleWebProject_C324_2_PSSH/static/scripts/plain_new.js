/**
 * Баллистический калькулятор - обработка форм и UI
 */

let ballisticAnimation = null;

// Функция расчета
async function calculateTrajectory() {
    const params = {
        mass: parseFloat(document.getElementById('mass').value),
        drag: parseFloat(document.getElementById('drag').value),
        velocity: parseFloat(document.getElementById('velocity').value),
        angle: parseFloat(document.getElementById('angle').value),
        deltaTime: parseFloat(document.getElementById('deltaTime').value)
    };
    
    // Валидация угла
    if (params.angle < 0) params.angle = 0;
    if (params.angle > 90) params.angle = 90;
    document.getElementById('angle').value = params.angle;
    
    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Обновляем результаты
            document.getElementById('maxHeight').innerHTML = data.max_height.toFixed(2) + ' м';
            document.getElementById('range').innerHTML = data.range.toFixed(2) + ' м';
            document.getElementById('flightTime').innerHTML = data.flight_time.toFixed(2) + ' с';
            document.getElementById('finalSpeed').innerHTML = data.final_speed.toFixed(2) + ' м/с';
            
            // Запускаем анимацию
            if (ballisticAnimation && data.trajectory) {
                ballisticAnimation.updateTrajectory(
                    data.trajectory,
                    data.range,
                    data.max_height
                );
            }
        } else {
            alert('Ошибка: ' + (data.error || 'Неизвестная ошибка'));
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при соединении с сервером');
    }
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
    
    document.getElementById('openTheoryBtn').onclick = () => theoryModal.style.display = 'flex';
    document.getElementById('closeTheoryBtn').onclick = () => theoryModal.style.display = 'none';
    document.getElementById('openPracticeBtn').onclick = () => practiceModal.style.display = 'flex';
    document.getElementById('closePracticeBtn').onclick = () => practiceModal.style.display = 'none';
    
    window.onclick = (event) => {
        if (event.target === theoryModal) theoryModal.style.display = 'none';
        if (event.target === practiceModal) practiceModal.style.display = 'none';
    };
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Создаем экземпляр анимации
    ballisticAnimation = new window.BallisticAnimation();
    
    // Назначаем обработчики
    document.getElementById('calculateBtn').addEventListener('click', calculateTrajectory);
    document.getElementById('resetBtn').addEventListener('click', resetParams);
    document.getElementById('randomAllBtn').addEventListener('click', randomAll);
    document.getElementById('saveJsonBtn').addEventListener('click', saveToJSON);
    document.getElementById('loadJsonBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    document.getElementById('fileInput').addEventListener('change', (e) => {
        loadFromJSON(e.target.files[0]);
    });
    
    // Кнопки "Слч"
    document.querySelectorAll('.random-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            randomParameter(btn.getAttribute('data-target'));
        });
    });
    
    // Скролл к панели
    document.getElementById('scrollToInputsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('inputsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Инициализация модальных окон
    initModals();
    
    // Первоначальный расчет
    setTimeout(calculateTrajectory, 100);
});