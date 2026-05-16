/**
 * Баллистический калькулятор - координатная плоскость и UI
 */

class CoordinatePlane {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Настройки отступов
        this.padding = {
            left: 70,
            right: 50,
            top: 50,
            bottom: 60
        };
        
        this.canvas.width = 900;
        this.canvas.height = 500;
        
        this.originX = this.padding.left;
        this.originY = this.canvas.height - this.padding.bottom;
        this.width = this.canvas.width - this.padding.left - this.padding.right;
        this.height = this.canvas.height - this.padding.top - this.padding.bottom;
        
        // Динамические масштабы
        this.maxRange = 100;
        this.maxHeight = 40;
        this.scaleX = this.width / this.maxRange;
        this.scaleY = this.height / this.maxHeight;
        
        this.init();
    }
    
    init() {
        this.drawPlane();
    }
    
    updateScale(range, height) {
        // Добавляем запас 10%
        this.maxRange = Math.max(range * 1.1, 50);
        this.maxHeight = Math.max(height * 1.2, 30);
        
        // Ограничиваем максимум
        this.maxRange = Math.min(this.maxRange, 300);
        this.maxHeight = Math.min(this.maxHeight, 100);
        
        this.scaleX = this.width / this.maxRange;
        this.scaleY = this.height / this.maxHeight;
        
        // Округляем для красивых цифр на осях
        this.maxRange = Math.ceil(this.maxRange / 10) * 10;
        this.maxHeight = Math.ceil(this.maxHeight / 5) * 5;
        
        this.scaleX = this.width / this.maxRange;
        this.scaleY = this.height / this.maxHeight;
    }
    
    drawPlane() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawAxes();
        this.drawArrows();
        this.drawLabels();
        this.drawAxisNumbers();
    }
    
    drawGrid() {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(148, 137, 121, 0.2)';
        this.ctx.lineWidth = 0.8;
        
        // Вертикальные линии (адаптивный шаг)
        let xStep = this.getOptimalXStep();
        for (let x = 0; x <= this.maxRange; x += xStep) {
            const screenX = this.originX + x * this.scaleX;
            if (screenX <= this.originX + this.width) {
                this.ctx.beginPath();
                this.ctx.moveTo(screenX, this.originY);
                this.ctx.lineTo(screenX, this.originY - this.height);
                this.ctx.stroke();
            }
        }
        
        // Горизонтальные линии (адаптивный шаг)
        let yStep = this.getOptimalYStep();
        for (let y = 0; y <= this.maxHeight; y += yStep) {
            const screenY = this.originY - y * this.scaleY;
            if (screenY >= this.originY - this.height) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.originX, screenY);
                this.ctx.lineTo(this.originX + this.width, screenY);
                this.ctx.stroke();
            }
        }
        
        this.ctx.restore();
    }
    
    getOptimalXStep() {
        if (this.maxRange <= 50) return 10;
        if (this.maxRange <= 100) return 20;
        if (this.maxRange <= 200) return 40;
        return 50;
    }
    
    getOptimalYStep() {
        if (this.maxHeight <= 20) return 5;
        if (this.maxHeight <= 50) return 10;
        if (this.maxHeight <= 100) return 20;
        return 25;
    }
    
    drawAxes() {
        this.ctx.save();
        this.ctx.strokeStyle = '#DFD0B8';
        this.ctx.lineWidth = 2.5;
        
        // Ось X
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY);
        this.ctx.lineTo(this.originX + this.width, this.originY);
        this.ctx.stroke();
        
        // Ось Y
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY);
        this.ctx.lineTo(this.originX, this.originY - this.height);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    drawArrows() {
        this.ctx.save();
        this.ctx.fillStyle = '#DFD0B8';
        const arrowSize = 8;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX + this.width, this.originY);
        this.ctx.lineTo(this.originX + this.width - arrowSize, this.originY - arrowSize / 2);
        this.ctx.lineTo(this.originX + this.width - arrowSize, this.originY + arrowSize / 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY - this.height);
        this.ctx.lineTo(this.originX - arrowSize / 2, this.originY - this.height + arrowSize);
        this.ctx.lineTo(this.originX + arrowSize / 2, this.originY - this.height + arrowSize);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawLabels() {
        this.ctx.save();
        this.ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
        this.ctx.fillStyle = '#DFD0B8';
        this.ctx.fillText('Расстояние X (м)', this.originX + this.width - 120, this.originY + 35);
        this.ctx.fillText('Высота Y (м)', this.originX - 55, this.originY - this.height - 10);
        this.ctx.restore();
    }
    
    drawAxisNumbers() {
        this.ctx.save();
        this.ctx.font = '11px "Segoe UI", Arial, sans-serif';
        this.ctx.fillStyle = '#DFD0B8';
        this.ctx.textAlign = 'center';
        
        // Подписи на оси X
        let xStep = this.getOptimalXStep();
        for (let x = 0; x <= this.maxRange; x += xStep) {
            const screenX = this.originX + x * this.scaleX;
            if (screenX <= this.originX + this.width) {
                let textX = screenX;
                if (x === this.maxRange) textX = screenX - 15;
                this.ctx.fillText(x.toString(), textX, this.originY + 18);
            }
        }
        
        // Подписи на оси Y
        let yStep = this.getOptimalYStep();
        for (let y = 0; y <= this.maxHeight; y += yStep) {
            const screenY = this.originY - y * this.scaleY;
            if (screenY >= this.originY - this.height) {
                let textY = screenY + 4;
                if (y === 0) textY = screenY + 8;
                if (y === this.maxHeight) textY = screenY - 5;
                this.ctx.fillText(y.toString(), this.originX - 20, textY);
            }
        }
        
        this.ctx.restore();
    }
    
    drawFullTrajectory(trajectory) {
        if (!trajectory || trajectory.length < 2) return;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(52, 152, 219, 0.6)';
        this.ctx.lineWidth = 2.5;
        this.ctx.setLineDash([8, 6]);
        
        let firstPoint = true;
        for (const point of trajectory) {
            let x = Math.min(point.x, this.maxRange);
            let y = Math.min(point.y, this.maxHeight);
            const screenX = this.originX + x * this.scaleX;
            const screenY = this.originY - y * this.scaleY;
            
            if (firstPoint) {
                this.ctx.moveTo(screenX, screenY);
                firstPoint = false;
            } else {
                this.ctx.lineTo(screenX, screenY);
            }
        }
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.restore();
    }
    
    drawTrail(trailPoints) {
        if (!trailPoints || trailPoints.length < 2) return;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#3498db';
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = '#3498db';
        
        let firstPoint = true;
        for (const point of trailPoints) {
            let x = Math.min(point.x, this.maxRange);
            let y = Math.min(point.y, this.maxHeight);
            const screenX = this.originX + x * this.scaleX;
            const screenY = this.originY - y * this.scaleY;
            
            if (firstPoint) {
                this.ctx.moveTo(screenX, screenY);
                firstPoint = false;
            } else {
                this.ctx.lineTo(screenX, screenY);
            }
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
        this.ctx.restore();
    }
    
    drawProjectile(point) {
        if (!point) return;
        
        let x = Math.min(point.x, this.maxRange);
        let y = Math.min(point.y, this.maxHeight);
        const screenX = this.originX + x * this.scaleX;
        const screenY = this.originY - y * this.scaleY;
        
        if (screenX >= this.originX && screenX <= this.originX + this.width &&
            screenY >= this.originY - this.height && screenY <= this.originY) {
            
            this.ctx.save();
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#e74c3c';
            
            this.ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, 8, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#e74c3c';
            this.ctx.beginPath();
            this.ctx.arc(screenX, screenY, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.beginPath();
            this.ctx.arc(screenX - 1.5, screenY - 1.5, 2, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(screenX - 1, screenY - 1, 1, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.restore();
        }
    }
    
    drawStartPoint() {
        this.ctx.fillStyle = '#2ecc71';
        this.ctx.beginPath();
        this.ctx.arc(this.originX, this.originY, 6, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(this.originX, this.originY, 3, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    reset() {
        this.drawPlane();
    }
}

let coordinatePlane = null;

// Функция валидации
function validateAndLimitInputs() {
    let mass = parseFloat(document.getElementById('mass').value);
    if (isNaN(mass)) mass = 1.0;
    mass = Math.max(0.5, Math.min(50, mass));
    document.getElementById('mass').value = mass.toFixed(2);
    
    let drag = parseFloat(document.getElementById('drag').value);
    if (isNaN(drag)) drag = 0.1;
    drag = Math.max(0.001, Math.min(5, drag));
    document.getElementById('drag').value = drag.toFixed(4);
    
    let velocity = parseFloat(document.getElementById('velocity').value);
    if (isNaN(velocity)) velocity = 20;
    velocity = Math.max(10, Math.min(100, velocity));
    document.getElementById('velocity').value = velocity.toFixed(1);
    
    let angle = parseFloat(document.getElementById('angle').value);
    if (isNaN(angle)) angle = 45;
    angle = Math.max(5, Math.min(85, angle));
    document.getElementById('angle').value = Math.round(angle);
    
    let deltaTime = parseFloat(document.getElementById('deltaTime').value);
    if (isNaN(deltaTime)) deltaTime = 0.02;
    deltaTime = Math.max(0.01, Math.min(0.05, deltaTime));
    document.getElementById('deltaTime').value = deltaTime.toFixed(3);
    
    return { mass, drag, velocity, angle, deltaTime };
}

// Функция расчета
async function calculateTrajectory() {
    const params = validateAndLimitInputs();
    
    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('maxHeight').innerHTML = data.max_height.toFixed(2) + ' м';
            document.getElementById('range').innerHTML = data.range.toFixed(2) + ' м';
            document.getElementById('flightTime').innerHTML = data.flight_time.toFixed(2) + ' с';
            document.getElementById('finalSpeed').innerHTML = data.final_speed.toFixed(2) + ' м/с';
            
            if (window.projectileAnimation && data.trajectory) {
                // Обновляем масштаб перед анимацией
                if (coordinatePlane) {
                    coordinatePlane.updateScale(data.range, data.max_height);
                }
                window.projectileAnimation.updateTrajectory(
                    data.trajectory,
                    data.range,
                    data.max_height
                );
            }
        } else {
            console.error('Ошибка:', data.error);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Сброс
function resetParams() {
    document.getElementById('mass').value = '1.0';
    document.getElementById('drag').value = '0.1';
    document.getElementById('velocity').value = '20.0';
    document.getElementById('angle').value = '45';
    document.getElementById('deltaTime').value = '0.02';
    calculateTrajectory();
}

// Случайные
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

// JSON
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

// Модальные окна
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

// Плавный скролл с отступом
function smoothScrollTo(element, offset = 100) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    coordinatePlane = new CoordinatePlane('coordinateCanvas');
    window.coordinatePlane = coordinatePlane;
    
    // Обработчики кнопок
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
    
    document.querySelectorAll('.random-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            randomParameter(btn.getAttribute('data-target'));
        });
    });
    
    // Скролл с отступом
    const scrollBtn = document.getElementById('scrollToInputsBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputsPanel = document.getElementById('inputsPanel');
            if (inputsPanel) {
                smoothScrollTo(inputsPanel, 80);
            }
        });
    }
    
    initModals();
    
    setTimeout(() => {
        calculateTrajectory();
    }, 100);
});