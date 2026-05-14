var canvas = document.getElementById('coordinateCanvas');
var ctx = canvas.getContext('2d');

var padding = 80;
var width = canvas.width - padding * 2;
var height = canvas.height - padding * 2;

var originX = padding;
var originY = canvas.height - padding;

function drawAxes() {
    ctx.save();
    ctx.strokeStyle = '#2c3e50';
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
    ctx.fillStyle = '#2c3e50';
    
    var arrowSize = 9;
    
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
    ctx.fillStyle = '#2c3e50';
    
    ctx.fillText('Расстояние X (м)', originX + width - 85, originY - 12);
    ctx.fillText('Высота Y (м)', originX - 45, originY - height + 8);
    
    ctx.font = '12px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText('0', originX - 10, originY + 5);
    
    ctx.restore();
}

function drawGridAndTicks() {
    ctx.save();
    ctx.strokeStyle = '#e8ecef';
    ctx.lineWidth = 0.8;
    
    var step = 80;
    var tickLength = 7;
    
    for (var x = originX + step; x < originX + width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, originY);
        ctx.lineTo(x, originY - height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, originY - tickLength / 2);
        ctx.lineTo(x, originY + tickLength / 2);
        ctx.stroke();
        
        ctx.fillStyle = '#95a5a6';
        ctx.font = '11px "Segoe UI", Arial, sans-serif';
        var value = Math.round(((x - originX) / step) * 10);
        if (value > 0 && value < 200) {
            ctx.fillText(value, x - 6, originY + 22);
        }
    }
    
    for (var y = originY - step; y > originY - height; y -= step) {
        ctx.beginPath();
        ctx.moveTo(originX, y);
        ctx.lineTo(originX + width, y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(originX - tickLength / 2, y);
        ctx.lineTo(originX + tickLength / 2, y);
        ctx.stroke();
        
        ctx.fillStyle = '#95a5a6';
        ctx.font = '11px "Segoe UI", Arial, sans-serif';
        var value = Math.round(((originY - y) / step) * 10);
        if (value > 0 && value < 100) {
            ctx.fillText(value, originX - 35, y + 4);
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