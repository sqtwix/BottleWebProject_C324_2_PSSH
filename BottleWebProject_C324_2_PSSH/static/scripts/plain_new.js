var canvas = document.getElementById('coordinateCanvas');
var ctx = canvas.getContext('2d');

// Уменьшаем размер canvas для устранения скролла
canvas.width = 900;
canvas.height = 500;

var padding = 70;
var width = canvas.width - padding * 2;
var height = canvas.height - padding * 2;

var originX = padding;
var originY = canvas.height - padding;

function drawAxes() {
    ctx.save();
    ctx.strokeStyle = '#DFD0B8';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - height);
    ctx.stroke();

    ctx.restore();
}

function drawArrows() {
    ctx.save();
    ctx.fillStyle = '#DFD0B8';
    
    var arrowSize = 8;
    
    ctx.beginPath();
    ctx.moveTo(originX + width, originY);
    ctx.lineTo(originX + width - arrowSize, originY - arrowSize / 2);
    ctx.lineTo(originX + width - arrowSize, originY + arrowSize / 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(originX, originY - height);
    ctx.lineTo(originX - arrowSize / 2, originY - height + arrowSize);
    ctx.lineTo(originX + arrowSize / 2, originY - height + arrowSize);
    ctx.fill();
    
    ctx.restore();
}

function drawLabels() {
    ctx.save();
    ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#DFD0B8';
    
    // Смещаем подписи осей
    ctx.fillText('Расстояние X (м)', originX + width - 100, originY + 24);
    ctx.fillText('Высота Y (м)', originX - 65, originY - height - 10);
    
    ctx.font = '12px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#DFD0B8';
    ctx.fillText('0', originX - 15, originY + 5);
    
    ctx.restore();
}

function drawGridAndTicks() {
    ctx.save();
    ctx.strokeStyle = 'rgba(223, 208, 184, 0.2)';
    ctx.lineWidth = 0.8;
    
    // Увеличиваем шаг сетки для уменьшения количества меток
    var step = Math.min(100, width / 5);
    var tickLength = 6;
    
    // Вертикальные линии и засечки на оси X
    var xCount = 0;
    for (var x = originX + step; x < originX + width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, originY);
        ctx.lineTo(x, originY - height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, originY - tickLength / 2);
        ctx.lineTo(x, originY + tickLength / 2);
        ctx.stroke();
        
        ctx.fillStyle = '#DFD0B8';
        ctx.font = '11px "Segoe UI", Arial, sans-serif';
        var value = Math.round(((x - originX) / width) * 100);
        if (value > 0 && value <= 100 && xCount < 6) {
            // Смещаем цифры под ось X и центрируем
            ctx.fillText(value, x - 8, originY + 18);
            xCount++;
        }
    }
    
    // Горизонтальные линии и засечки на оси Y
    var yCount = 0;
    for (var y = originY - step; y > originY - height; y -= step) {
        ctx.beginPath();
        ctx.moveTo(originX, y);
        ctx.lineTo(originX + width, y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(originX - tickLength / 2, y);
        ctx.lineTo(originX + tickLength / 2, y);
        ctx.stroke();
        
        ctx.fillStyle = '#DFD0B8';
        ctx.font = '11px "Segoe UI", Arial, sans-serif';
        var value = Math.round(((originY - y) / height) * 20);
        if (value > 0 && value <= 20 && yCount < 5) {
            // Смещаем цифры влево от оси Y
            ctx.fillText(value, originX - 28, y + 4);
            yCount++;
        }
    }
    
    ctx.restore();
}

function drawCoordinateSystem() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridAndTicks();
    drawAxes();
    drawArrows();
    drawLabels();
}

drawCoordinateSystem();

function validateAndGetFloat(id, defaultValue) {
    var element = document.getElementById(id);
    var value = parseFloat(element.value.replace(',', '.'));
    if (isNaN(value)) {
        element.value = defaultValue;
        return defaultValue;
    }
    return value;
}

var randomBtns = document.querySelectorAll('.random-btn');
for (var i = 0; i < randomBtns.length; i++) {
    randomBtns[i].addEventListener('click', function() {
        var targetId = this.dataset.target;
        var input = document.getElementById(targetId);
        if (input) {
            var randomValue;
            switch(targetId) {
                case 'mass':
                    randomValue = (Math.random() * 10 + 0.5).toFixed(2);
                    break;
                case 'drag':
                    randomValue = (Math.random() * 0.5 + 0.05).toFixed(3);
                    break;
                case 'velocity':
                    randomValue = (Math.random() * 50 + 10).toFixed(1);
                    break;
                case 'angle':
                    randomValue = Math.floor(Math.random() * 85) + 5;
                    break;
                case 'deltaTime':
                    randomValue = (Math.random() * 0.08 + 0.01).toFixed(3);
                    break;
                default:
                    randomValue = (Math.random() * 100).toFixed(2);
            }
            input.value = randomValue;
        }
    });
}

var randomAllBtn = document.getElementById('randomAllBtn');
if (randomAllBtn) {
    randomAllBtn.addEventListener('click', function() {
        document.getElementById('mass').value = (Math.random() * 10 + 0.5).toFixed(2);
        document.getElementById('drag').value = (Math.random() * 0.5 + 0.05).toFixed(3);
        document.getElementById('velocity').value = (Math.random() * 50 + 10).toFixed(1);
        document.getElementById('angle').value = Math.floor(Math.random() * 85) + 5;
        document.getElementById('deltaTime').value = (Math.random() * 0.08 + 0.01).toFixed(3);
        calculateTrajectory();
    });
}

var resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        document.getElementById('mass').value = '1.0';
        document.getElementById('drag').value = '0.1';
        document.getElementById('velocity').value = '20.0';
        document.getElementById('angle').value = '45';
        document.getElementById('deltaTime').value = '0.02';
        calculateTrajectory();
    });
}

function getCurrentData() {
    return {
        mass: parseFloat(document.getElementById('mass').value) || 1.0,
        drag: parseFloat(document.getElementById('drag').value) || 0.1,
        velocity: parseFloat(document.getElementById('velocity').value) || 20.0,
        angle: parseFloat(document.getElementById('angle').value) || 45,
        deltaTime: parseFloat(document.getElementById('deltaTime').value) || 0.02
    };
}

function setDataToForm(data) {
    if (data.mass !== undefined) document.getElementById('mass').value = data.mass;
    if (data.drag !== undefined) document.getElementById('drag').value = data.drag;
    if (data.velocity !== undefined) document.getElementById('velocity').value = data.velocity;
    if (data.angle !== undefined) document.getElementById('angle').value = data.angle;
    if (data.deltaTime !== undefined) document.getElementById('deltaTime').value = data.deltaTime;
    calculateTrajectory();
}

var fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var data = JSON.parse(e.target.result);
                    setDataToForm(data);
                } catch (err) {
                    alert('Ошибка при загрузке JSON: ' + err.message);
                }
            };
            reader.readAsText(file);
        }
    });
}

var saveJsonBtn = document.getElementById('saveJsonBtn');
if (saveJsonBtn) {
    saveJsonBtn.addEventListener('click', function() {
        var data = getCurrentData();
        var jsonStr = JSON.stringify(data, null, 4);
        var blob = new Blob([jsonStr], {type: 'application/json'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'projectile_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

var labelFileInput = document.querySelector('label[for="fileInput"]');
if (labelFileInput) {
    labelFileInput.addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });
}

function calculateTrajectory() {
    var mass = validateAndGetFloat('mass', 1.0);
    var drag = validateAndGetFloat('drag', 0.1);
    var velocity = validateAndGetFloat('velocity', 20.0);
    var angle = validateAndGetFloat('angle', 45.0);
    var dt = validateAndGetFloat('deltaTime', 0.02);
    
    if (angle < 0) angle = 0;
    if (angle > 90) angle = 90;
    if (velocity < 0) velocity = 0;
    
    document.getElementById('angle').value = angle;
    
    var g = 9.81;
    var rad = angle * Math.PI / 180;
    var vx0 = velocity * Math.cos(rad);
    var vy0 = velocity * Math.sin(rad);
    
    var timeOfFlight = (2 * vy0) / g;
    var maxHeight = (vy0 * vy0) / (2 * g);
    var range = vx0 * timeOfFlight;
    var finalSpeed = Math.sqrt(vx0 * vx0 + (vy0 - g * timeOfFlight) * (vy0 - g * timeOfFlight));
    
    document.getElementById('maxHeight').innerHTML = maxHeight.toFixed(2) + ' м';
    document.getElementById('range').innerHTML = range.toFixed(2) + ' м';
    document.getElementById('flightTime').innerHTML = timeOfFlight.toFixed(2) + ' с';
    document.getElementById('finalSpeed').innerHTML = finalSpeed.toFixed(2) + ' м/с';
    
    // Рисуем траекторию
    drawTrajectory(velocity, angle);
}

function drawTrajectory(velocity, angle) {
    var g = 9.81;
    var rad = angle * Math.PI / 180;
    var vx0 = velocity * Math.cos(rad);
    var vy0 = velocity * Math.sin(rad);
    var timeOfFlight = (2 * vy0) / g;
    var maxRange = vx0 * timeOfFlight;
    var maxHeight = (vy0 * vy0) / (2 * g);
    
    // Масштабирование
    var scaleX = width / maxRange;
    var scaleY = height / maxHeight;
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#E74C3C';
    ctx.lineWidth = 2.5;
    
    var firstPoint = true;
    for (var t = 0; t <= timeOfFlight; t += 0.02) {
        var x = vx0 * t;
        var y = vy0 * t - 0.5 * g * t * t;
        
        if (y < 0) break;
        
        var canvasX = originX + x * scaleX;
        var canvasY = originY - y * scaleY;
        
        if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
    
    // Рисуем точку старта со смещением подписи
    ctx.beginPath();
    ctx.arc(originX, originY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#2ECC71';
    ctx.fill();
    ctx.fillStyle = '#DFD0B8';
    ctx.font = 'bold 11px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Старт', originX - 48, originY - 8);
    
    // Рисуем точку финиша со смещением подписи
    var endX = originX + maxRange * scaleX;
    ctx.beginPath();
    ctx.arc(endX, originY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#3498DB';
    ctx.fill();
    ctx.fillStyle = '#DFD0B8';
    ctx.fillText('Финиш', endX + 10, originY - 8);
    
    // Точка максимальной высоты
    var maxHeightPointX = originX + (maxRange / 2) * scaleX;
    var maxHeightPointY = originY - maxHeight * scaleY;
    ctx.beginPath();
    ctx.arc(maxHeightPointX, maxHeightPointY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#F39C12';
    ctx.fill();
    ctx.fillStyle = '#DFD0B8';
    ctx.font = '10px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Макс. высота', maxHeightPointX + 10, maxHeightPointY - 8);
    
    ctx.restore();
}

var calculateBtn = document.getElementById('calculateBtn');
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateTrajectory);
}

for (var i = 0; i < document.querySelectorAll('.input-with-button input').length; i++) {
    document.querySelectorAll('.input-with-button input')[i].addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateTrajectory();
        }
    });
}

calculateTrajectory();