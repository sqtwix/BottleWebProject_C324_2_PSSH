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

var randomBtns = document.querySelectorAll('.random-btn');
for (var i = 0; i < randomBtns.length; i++) {
    randomBtns[i].addEventListener('click', function() {
        var targetId = this.dataset.target;
        var input = document.getElementById(targetId);
        if (input) {
            var randomValue = (Math.random() * 100).toFixed(2);
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
    });
}

var calculateBtn = document.getElementById('calculateBtn');
if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
        var mass = parseFloat(document.getElementById('mass').value);
        var drag = parseFloat(document.getElementById('drag').value);
        var velocity = parseFloat(document.getElementById('velocity').value);
        var angle = parseFloat(document.getElementById('angle').value);
        var dt = parseFloat(document.getElementById('deltaTime').value);
        
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
    });
}