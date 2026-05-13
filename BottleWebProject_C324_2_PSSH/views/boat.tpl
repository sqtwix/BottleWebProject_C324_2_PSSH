% rebase('layout.tpl', title=title, year=year)

<link rel="stylesheet" type="text/css" href="/static/content/boat.css" />
<link rel="stylesheet" type="text/css" href="/static/content/modal_window.css" />


<section class="title-bar">
<h1> Модель парусной лодки </h1>
    <section class="title-bar">
        <button class="btn" id="openExampleBtn">Пример</button>
        <button class="btn" id="openTheoryBtn">Теория</button>
    </section>
</section>

<section class="form-card">
</section>

<section class="title-bar">
<section class="form-card">
    <h2>Результаты оптимизации</h2>
</section>
<section class="form-card">
    <h2>Рассчитать для своих параметров</h2>
    <form action="/boat/calculate" method="POST">
        <label> Скорость течения (м/с):</lable>
        <input type="number" step="0.1" name="v_cur" value="1.0" required>

        <label>Скорость ветра (м/с):</label>
        <input type="number" step="1" name="v_wind" value="5.0" required>

        <label>Коэффициент сопротивления воды c (Н·с²/м²):</label>
        <input type="number" step="1" name="c" value="10" required>

        <label>Коэффициент парусности k<sub>wind</sub> (Н·с²/м²):</label>
        <input type="number" step="0.1" name="k_wind" value="1.2" required>

        <button class="btn">Рассчитать</button>
    </form>
</section>
</section>

<section id="theoryModal" class="modal">
    <section class="modal-content">
        <section class="modal-header">
            <h2> Теоретические основы </h2>
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

<section id="exampleModal" class="modal">
    <section class="modal-content">
        <section class="modal-header">
            <h2> Пример </h2>
            <button class="modal-close" id="closeExampleBtn">&times;</button>
        </section>
        <section class="modal-body">
        <ul>
            <li>Скорость течения: <code>v<sub>cur</sub> = 1.0 м/с</code></li>
            <li>Скорость ветра: <code>v<sub>wind</sub> = 5.0 м/с</code></li>
            <li>Коэффициент сопротивления воды: <code>c = 10 Н·с²/м²</code></li>
            <li>Коэффициент парусности: <code>k<sub>wind</sub> = 1.2 Н·с²/м²</code></li>
        </ul>
        <p>Результат оптимизации: <code><strong>θ<sub>opt</sub> ≈ 47°</strong>, <strong>v<sub>max</sub> ≈ 2.85 м/с</strong></code></p>
        </section>
    </section>
</section>

