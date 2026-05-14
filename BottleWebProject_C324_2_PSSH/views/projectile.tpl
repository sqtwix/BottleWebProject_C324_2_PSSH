% rebase('layout.tpl', title='Баллистический калькулятор', year=year)

<div class="hero-section fade-in">
    <div class="hero-content">
        <h1>Баллистический калькулятор</h1>
        <p>Моделирование движения тела, брошенного под углом к горизонту, с учетом сопротивления воздуха</p>
    </div>
</div>

<div class="graph-container">
    <div class="graph-header">
        <h2>Траектория полета</h2>
        <span class="coordinate-badge">Декартова система координат</span>
    </div>
    <div class="graph-wrapper">
        <div class="graph-canvas-container">
            <canvas id="coordinateCanvas" width="1400" height="700"></canvas>
        </div>
    </div>
</div>

<div class="bottom-panels">
    <div class="results-panel">
        <div class="panel-header-custom">
            <h3>Результаты расчета</h3>
        </div>
        <div class="results-grid-custom">
            <div class="result-item">
                <div class="result-label">Максимальная высота</div>
                <div class="result-number" id="maxHeight">0.00 м</div>
            </div>
            <div class="result-item">
                <div class="result-label">Дальность полета</div>
                <div class="result-number" id="range">0.00 м</div>
            </div>
            <div class="result-item">
                <div class="result-label">Время полета</div>
                <div class="result-number" id="flightTime">0.00 с</div>
            </div>
            <div class="result-item">
                <div class="result-label">Конечная скорость</div>
                <div class="result-number" id="finalSpeed">0.00 м/с</div>
            </div>
        </div>
    </div>
    
    <div class="input-panel">
        <div class="panel-header-custom">
            <h3>Параметры модели</h3>
        </div>
        <div class="inputs-grid">
            <div class="input-field">
                <label>Масса объекта (кг)</label>
                <div class="input-with-button">
                    <input type="text" id="mass" placeholder="кг" value="1.0" inputmode="decimal">
                    <button class="input-btn random-btn" data-target="mass">Слч</button>
                </div>
            </div>
            
            <div class="input-field">
                <label>Коэффициент сопротивления</label>
                <div class="input-with-button">
                    <input type="text" id="drag" placeholder="Cd" value="0.1" inputmode="decimal">
                    <button class="input-btn random-btn" data-target="drag">Слч</button>
                </div>
            </div>
            
            <div class="input-field">
                <label>Начальная скорость (м/с)</label>
                <div class="input-with-button">
                    <input type="text" id="velocity" placeholder="м/с" value="20.0" inputmode="decimal">
                    <button class="input-btn random-btn" data-target="velocity">Слч</button>
                </div>
            </div>
            
            <div class="input-field">
                <label>Угол броска (градусы)</label>
                <div class="input-with-button">
                    <input type="text" id="angle" placeholder="градусы" value="45" inputmode="numeric">
                    <button class="input-btn random-btn" data-target="angle">Слч</button>
                </div>
            </div>
            
            <div class="input-field">
                <label>Шаг времени (сек)</label>
                <div class="input-with-button">
                    <input type="text" id="deltaTime" placeholder="с" value="0.02" inputmode="decimal">
                    <button class="input-btn random-btn" data-target="deltaTime">Слч</button>
                </div>
            </div>
        </div>
        
        <div class="button-group-custom">
            <button class="btn btn-primary" id="calculateBtn">Рассчитать траекторию</button>
            <button class="btn btn-secondary" id="resetBtn">Сбросить параметры</button>
            <button class="btn btn-accent" id="randomAllBtn">Заполнить случайными</button>
            <button for="fileInput" class="btn btn-primary">Загрузить JSON</button>
            <input type="file" id="fileInput" accept=".json" style="display: none;">
        </div>
        
        <div class="action-buttons">
            <button class="btn btn-theory" id="openTheoryBtn">Теория</button>
            <button class="btn btn-practice" id="openPracticeBtn">Пример расчета</button>
        </div>
    </div>
</div>

<div id="theoryModal" class="modal">
    <div class="modal-content modal-large">
        <div class="modal-header">
            <h3>Теоретические основы</h3>
            <button class="modal-close" id="closeTheoryBtn">&times;</button>
        </div>
        <div class="modal-body">
            <h4>Движение тела, брошенного под углом к горизонту</h4>
            <p>Основные уравнения движения без учета сопротивления воздуха:</p>
            <p class="formula">x(t) = v₀ · cos(θ) · t</p>
            <p class="formula">y(t) = v₀ · sin(θ) · t - (g · t²)/2</p>
            <p>где:</p>
            <ul class="formula-list">
                <li>v₀ — начальная скорость (м/с)</li>
                <li>θ — угол броска (градусы)</li>
                <li>g = 9.81 м/с² — ускорение свободного падения</li>
                <li>t — время (с)</li>
            </ul>
            <div class="separator-light"></div>
            <p><strong>Максимальная высота:</strong></p>
            <p class="formula">H = (v₀² · sin²(θ)) / (2g)</p>
            <p><strong>Дальность полета:</strong></p>
            <p class="formula">L = (v₀² · sin(2θ)) / g</p>
            <p><strong>Время полета:</strong></p>
            <p class="formula">T = (2v₀ · sin(θ)) / g</p>
        </div>
    </div>
</div>

<div id="practiceModal" class="modal">
    <div class="modal-content modal-large">
        <div class="modal-header">
            <h3>Пример расчета</h3>
            <button class="modal-close" id="closePracticeBtn">&times;</button>
        </div>
        <div class="modal-body">
            <p><strong>Исходные данные:</strong></p>
            <p>Начальная скорость: v₀ = 20 м/с</p>
            <p>Угол броска: θ = 45°</p>
            <p>Масса: m = 1 кг</p>
            <p>Коэффициент сопротивления: 0.1 (для демонстрации)</p>
            <div class="separator-light"></div>
            <p><strong>Расчет без сопротивления воздуха:</strong></p>
            <p>sin(45°) = 0.707, cos(45°) = 0.707</p>
            <p>Время полета:</p>
            <p class="formula">T = (2 · 20 · 0.707) / 9.81 = 2.88 с</p>
            <p>Максимальная высота:</p>
            <p class="formula">H = (20² · 0.707²) / (2 · 9.81) = 10.2 м</p>
            <p>Дальность полета:</p>
            <p class="formula">L = (20² · sin(90°)) / 9.81 = 40.8 м</p>
            <div class="separator-light"></div>
            <p><strong>Результат:</strong> Тело упадет на расстоянии 40.8 метров от точки броска через 2.88 секунд, поднявшись на высоту 10.2 метра.</p>
            <div class="separator-light"></div>
            <p><strong>Примечание:</strong> При учете сопротивления воздуха дальность и время полета уменьшаются, траектория становится асимметричной.</p>
        </div>
    </div>
</div>

<script src="/static/scripts/plain.js"></script>
<script src="/static/scripts/modal_logic.js"></script>