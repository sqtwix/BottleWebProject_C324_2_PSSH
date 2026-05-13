% rebase('layout.tpl', title=title, year=year)

<link rel="stylesheet" type="text/css" href="/static/content/boat.css" />

<section class="title-bar">
<h1> Модель парусной лодки </h1>
    <button class="btn" id="openTheoryBtn">Теория</button>
</section>

<section id="theoryModal" class="modal">
    <section class="modal-content">
        <section class="modal-header">
            <h3> Теоретические основы </h3>
            <button class="modal-close" id="closeModalBtn">&times;</button>
        </section>
        <section class="modal-body">
            <p><strong> Модель движения парусной лодки </strong></p>
            <p>Установившееся движение описывается равенством силы ветра на парус и силы сопротивления воды:</p>
            <p class="formula-box">F<sub>wind</sub> + F<sub>drag</sub> = 0</p>
            <p><strong>Сила ветра:</strong></p>
            <p class="formula-box">F<sub>wind</sub> = k<sub>wind</sub> · u² · max(0, sin φ)</p>
            <p>где u – относительная скорость ветра, φ – угол атаки паруса.</p>
            <p><strong>Сила сопротивления воды:</strong></p>
            <p class="formula-box">F<sub>drag</sub> = –c · |v<sub>rel,water</sub>| · v<sub>rel,water</sub></p>
            <p>Оптимальный угол паруса θ<sub>opt</sub> находится перебором от 0° до 180° с шагом 1°.</p>
        </section>
    </section>
</section>

<script>
    // --- Модальное окно ---
    const modal = document.getElementById('theoryModal');
    const openBtn = document.getElementById('openTheoryBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    openBtn.onclick = () => {
       modal.style.display = 'flex';
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
</script>