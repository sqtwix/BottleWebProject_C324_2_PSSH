% rebase('layout.tpl', title=title, year=year)

<!-- Модальное окно теории -->
<dialog id="theoryModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>📖 Теоретические основы</h3>
            <button class="modal-close" id="closeModalBtn">&times;</button>
        </div>
        <div class="modal-body">
            <p><strong>Стационарная теплопроводность стержня</strong></p>
            <p>При отсутствии внутренних источников тепла и постоянном коэффициенте теплопроводности распределение температуры вдоль однородного стержня описывается уравнением Лапласа:</p>
            <p style="background: var(--bg-deep); padding: 8px; border-radius: 6px; text-align: center;">d²T/dx² = 0</p>
            <p>При граничных условиях первого рода (заданы температуры на концах) решение имеет линейный вид:</p>
            <p style="background: var(--bg-deep); padding: 8px; border-radius: 6px; text-align: center;">T(x) = T<sub>L</sub> + (T<sub>R</sub> - T<sub>L</sub>)·x / L</p>
            <p>Тепловой поток постоянен и определяется законом Фурье.</p>
        </div>
    </div>
</dialog>

<div class="page-header">
    <h1>Модель теплопроводности стержня</h1>
        <button id="openTheoryBtn" class="btn">Теория</button>
</div>

<!-- Карточка с формой ввода -->
<section class="card" aria-labelledby="params-heading">
    <h2 id="params-heading">⚙️ Параметры модели</h2>
    <form id="paramsForm">
        <fieldset>
            <legend>Геометрия и тепловые граничные условия</legend>
            <div class="grid-2col">
                <div class="form-group">
                    <label for="length">Длина стержня L (м)</label>
                    <input type="number" step="0.1" value="1.0" id="length" placeholder="Например: 1.0">
                </div>
                <div class="form-group">
                    <label for="tempLeft">Температура левого конца T<sub>L</sub> (°C)</label>
                    <input type="number" step="5" value="100" id="tempLeft" placeholder="100">
                </div>
                <div class="form-group">
                    <label for="tempRight">Температура правого конца T<sub>R</sub> (°C)</label>
                    <input type="number" step="5" value="20" id="tempRight" placeholder="20">
                </div>
                <div class="form-group">
                    <label for="nodes">Количество узлов N (2–200)</label>
                    <input type="number" min="2" max="200" value="50" id="nodes" placeholder="50">
                </div>
            </div>
        </fieldset>
        <button type="button" class="btn btn-calc" id="calcBtn">💻 Рассчитать (демо)</button>
    </form>
    <p class="note">* В текущей версии отображается только визуальная заглушка. Расчёт будет добавлен позже.</p>
</section>

<!-- Визуализация стержня (figure + figcaption) -->
<figure class="rod-container" aria-label="Визуализация температурного градиента стержня">
    <h2 class="rod-title">🔘 Распределение температуры (демо-градиент)</h2>
        <div class="rod-wrapper">
            <div class="rod" id="rodVisual" style="background: linear-gradient(90deg, #ff4d4d, #4d4dff);"></div>
        </div>
        <figcaption class="rod-labels">
            <span>❄️ Холодный конец (T<sub>L</sub>)</span>
            <span>🔥 Горячий конец (T<sub>R</sub>)</span>
        </figcaption>
    <p class="rod-hint">⬅️ Левая/Правая границы — заданные температуры</p>
</figure>

<!-- Место для графика температуры -->
<div class="card">
    <h2 style="margin-bottom: 1rem;">📈 График T(x)</h2>
        <div class="chart-placeholder" id="chartPlaceholder">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="70" width="80" height="5" fill="#948979"/>
                <polyline points="10,70 30,30 50,50 70,20 90,40" stroke="#DFD0B8" stroke-width="2" fill="none"/>
                <circle cx="30" cy="30" r="3" fill="#DFD0B8"/>
                <circle cx="70" cy="20" r="3" fill="#DFD0B8"/>
            </svg>
        <p style="margin-top: 10px;">Здесь будет построен график T(x) после ввода данных</p>
        </div>
</div>

<!--Подключение скрипта для обработкий действия на странице-->
<script src="static/scripts/heat.js"></script>

<!--Подключение скрипта для работы модального окна-->
<script src="static/scripts/modal_logic.js"></script>
