function drawBoat() {
    const canvas = document.querySelector('.canvas-boat');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let angleDeg = parseFloat(document.querySelector('input[name="theta_opt"]').value) || 0;
    ctx.clearRect(0, 0, width, height);

    //Море
    const seaHeight = height * 0.2;
    ctx.fillStyle = '#2c3e66';
    ctx.fillRect(0, height - seaHeight, width, seaHeight);

    //Лодка
    const boatX = width / 2;
    const boatY = height - seaHeight - 10;
    const boatHalfLen = width * 0.1;
    ctx.fillStyle = '#8B5A2B';
    ctx.beginPath();
    ctx.moveTo(boatX - boatHalfLen, boatY);
    ctx.lineTo(boatX + boatHalfLen, boatY);
    ctx.lineTo(boatX + boatHalfLen * 0.7, boatY + 45);
    ctx.lineTo(boatX - boatHalfLen * 0.7, boatY + 45);
    ctx.fill();

    //Мачта
    const mastHeight = height * 0.25;
    ctx.fillStyle = '#654321';
    ctx.fillRect(boatX - 2, boatY - mastHeight, 7, mastHeight);

    //Парус
    ctx.save();
    ctx.translate(boatX, boatY - mastHeight + 10);
    ctx.rotate(angleDeg * Math.PI / 180);
    ctx.fillStyle = '#DFD0B8';
    ctx.beginPath();
    ctx.moveTo(0, -mastHeight * 0.7);
    ctx.lineTo(boatHalfLen * 0.6, 0);
    ctx.lineTo(0, mastHeight * 0.3);
    ctx.fill();
    ctx.restore();
}

// Рисуем при загрузке страницы и при изменении угла
window.addEventListener('load', drawBoat);
const angleInput = document.querySelector('input[name="theta_opt"]');
if (angleInput) angleInput.addEventListener('change', drawBoat);
