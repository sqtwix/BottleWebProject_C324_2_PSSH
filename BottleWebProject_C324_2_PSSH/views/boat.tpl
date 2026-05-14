% rebase('layout.tpl', title=title, year=year)

<link rel="stylesheet" type="text/css" href="/static/content/boat.css" />
<link rel="stylesheet" type="text/css" href="/static/content/modal_window.css" />

<div class="form-card">
    <h1 class="header-center">Движение лодки с парусом</h1>
    <p class="paragraph-center">Оптимизация угла паруса для максимальной скорости с учётом ветра и течения.</p>
</div>

<div class="two-columns">
    <section class="form-card">
        <button id="openTheoryBtn" class="btn" type="button">Изучите теорию</button>
    </section>

    <section class="form-card">
        <button id="openExampleBtn" class="btn" type="button">Просмотрите пример</button>
    </section>
</div>

<div class="form-card-def">
    <h2> Модель парусной лодки </h2>
</div>

<div class="two-columns">
    <div class="form-card">
        <h2>Результаты оптимизации</h2>
    </div>
        <div class="form-card">
        <h2>Рассчитать для своих параметров</h2>
        <form action="/boat/calculate" method="POST">
            <label>Скорость течения (м/с):</label>
            <input type="number" step="0.1" min="0.5" max="5" name="v_cur" value="1.0" required>

            <label>Скорость ветра (м/с):</label>
            <input type="number" step="1" min="0" max="20" name="v_wind" value="5.0" required>

            <label>Коэффициент сопротивления воды c (Н·с²/м²):</label>
            <input type="number" step="1" min="5" max="20" name="c" value="10" required>

            <label>Коэффициент парусности k<sub>wind</sub> (Н·с²/м²):</label>
            <input type="number" step="0.1" min="0.5" max="5" name="k_wind" value="1.2" required>

            <button class="btn" type="submit">Рассчитать</button>
        </form>
    </div>
</div>

<div id="theoryModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2> Теоретические основы </h2>
            <button class="modal-close" id="closeModalBtn">&times;</button>
        </div>
        <div class="modal-body">
            <p><strong> Модель движения парусной лодки </strong></p>
            <p>Установившееся движение описывается равенством силы ветра на парус и силы сопротивления воды:</p>
            <p class="formula-box">F<sub>wind</sub> + F<sub>drag</sub> = 0</p>
            <p><strong>Сила ветра:</strong></p>
            <p class="formula-box">F<sub>wind</sub> = k<sub>wind</sub> · u² · max(0, sin φ)</p>
            <p>где u – относительная скорость ветра, φ – угол атаки паруса.</p>
            <p><strong>Сила сопротивления воды:</strong></p>
            <p class="formula-box">F<sub>drag</sub> = –c · |v<sub>rel,water</sub>| · v<sub>rel,water</sub></p>
            <p>Оптимальный угол паруса θ<sub>opt</sub> находится перебором от 0° до 180° с шагом 1°.</p>
        </div>
    </div>
</div>

<div id="exampleModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2> Пример </h2>
            <button class="modal-close" id="closeExampleBtn">&times;</button>
        </div>
        <div class="modal-body">
        <ul>
            <li>Скорость течения: <code>v<sub>cur</sub> = 1.0 м/с</code></li>
            <li>Скорость ветра: <code>v<sub>wind</sub> = 5.0 м/с</code></li>
            <li>Коэффициент сопротивления воды: <code>c = 10 Н·с²/м²</code></li>
            <li>Коэффициент парусности: <code>k<sub>wind</sub> = 1.2 Н·с²/м²</code></li>
        </ul>
        <p>Результат оптимизации: <code><strong>θ<sub>opt</sub> ≈ 47°</strong>, <strong>v<sub>max</sub> ≈ 2.85 м/с</strong></code></p>
        </div>
    </div>
</div>

