% rebase('layout.tpl', title=title, year=year)

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Теплопроводность стержня | Физическая модель</title>        
</head>
<body>

    <!-- Модальное окно теории -->
    <div id="theoryModal" class="modal">
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
    </div>

    <!-- Шапка сайта -->
    <header class="main-header">
        <div class="container">
            <a href="/" class="app-brand">Теплофизика</a>
            <ul class="nav-row">
                <li><a href="/" class="nav-link">Главная</a></li>
                <li><a href="/task2" class="nav-link">Сопротивление воздуха</a></li>
                <li><a href="/task3" class="nav-link active">Теплопроводность</a></li>
                <li><a href="/task5" class="nav-link">Парусная лодка</a></li>
            </ul>
        </div>
    </header>

    <main class="container fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0;">
            <h1>Модель теплопроводности стержня</h1>
            <button id="openTheoryBtn" class="btn" style="background: var(--bg-surface); color: var(--accent-bright); border: 1px solid var(--accent-muted);">📘 Теория</button>
        </div>

        <!-- Карточка с формой ввода -->
        <div class="card">
            <h2 style="margin-bottom: 1rem;">⚙️ Параметры модели</h2>
            <form id="paramsForm">
                <div class="grid-2col">
                    <div class="form-group">
                        <label>Длина стержня L (м)</label>
                        <input type="number" step="0.1" value="1.0" id="length" placeholder="Например: 1.0">
                    </div>
                    <div class="form-group">
                        <label>Температура левого конца T<sub>L</sub> (°C)</label>
                        <input type="number" step="5" value="100" id="tempLeft" placeholder="100">
                    </div>
                    <div class="form-group">
                        <label>Температура правого конца T<sub>R</sub> (°C)</label>
                        <input type="number" step="5" value="20" id="tempRight" placeholder="20">
                    </div>
                    <div class="form-group">
                        <label>Количество узлов N (2–200)</label>
                        <input type="number" min="2" max="200" value="50" id="nodes" placeholder="50">
                    </div>
                </div>
                <button type="button" class="btn btn-calc" id="calcBtn">💻 Рассчитать (демо)</button>
            </form>
            <p style="font-size: 0.8rem; margin-top: 0.8rem; color: var(--accent-muted);">* В текущей версии отображается только визуальная заглушка. Расчёт будет добавлен позже.</p>
        </div>

        <!-- Визуализация стержня (красивый модуль) -->
        <div class="rod-container">
            <div class="rod-title">🔘 Распределение температуры (демо-градиент)</div>
            <div class="rod-wrapper">
                <div class="rod" id="rodVisual" style="background: linear-gradient(90deg, #ff4d4d, #4d4dff);"></div>
            </div>
            <div class="rod-labels">
                <span>❄️ Холодный конец (T<sub>L</sub>)</span>
                <span>🔥 Горячий конец (T<sub>R</sub>)</span>
            </div>
            <p style="text-align: center; margin-top: 15px; font-size: 0.9rem;">⬅️ Левая/Правая границы — заданные температуры</p>
        </div>

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
    </main>

    <footer>
        <div class="container">
            <p>Команда 2: Прокудин, Симоненко, Шульга | Модель теплопроводности стержня</p>
        </div>
    </footer>

    <script>
        // --- Модальное окно: открытие / закрытие ---
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

        // --- Простая смена цвета стержня (демо) ---
        // Пока без логики, просто красивое изменение при нажатии кнопки "Рассчитать"
        const calcButton = document.getElementById('calcBtn');
        const rod = document.getElementById('rodVisual');
        const leftTempInput = document.getElementById('tempLeft');
        const rightTempInput = document.getElementById('tempRight');

        calcButton.addEventListener('click', () => {
            // Демонстрация: меняем градиент стержня в зависимости от введённых температур
            let leftVal = parseFloat(leftTempInput.value) || 0;
            let rightVal = parseFloat(rightTempInput.value) || 0;
            // Ограничим яркость для наглядности
            let leftColor, rightColor;
            
            // Преобразуем температуру в RGB-оттенок (условно, только для демо)
            const tMin = -50, tMax = 200;
            let normLeft = Math.min(1, Math.max(0, (leftVal - tMin) / (tMax - tMin)));
            let normRight = Math.min(1, Math.max(0, (rightVal - tMin) / (tMax - tMin)));
            
            // Синий (холодно) -> Красный (горячо)
            const rLeft = Math.floor(255 * normLeft);
            const bLeft = Math.floor(255 * (1 - normLeft));
            const rRight = Math.floor(255 * normRight);
            const bRight = Math.floor(255 * (1 - normRight));
            
            rod.style.background = `linear-gradient(90deg, rgb(${rLeft}, 50, ${bLeft}), rgb(${rRight}, 50, ${bRight}))`;
            
            // Показать временное уведомление в графике (симуляция)
            const chartDiv = document.getElementById('chartPlaceholder');
            chartDiv.innerHTML = `
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="70" width="80" height="5" fill="#948979"/>
                    <polyline points="10,70 30,30 50,50 70,20 90,40" stroke="#DFD0B8" stroke-width="2" fill="none"/>
                    <circle cx="30" cy="30" r="3" fill="#DFD0B8"/>
                    <circle cx="70" cy="20" r="3" fill="#DFD0B8"/>
                </svg>
                <p style="margin-top: 10px;">Демо-режим: при вводе T<sub>L</sub>=${leftVal}°C, T<sub>R</sub>=${rightVal}°C стержень меняет цвет.<br>Полноценный график будет построен позже.</p>
            `;
        });
    </script>
</body>
</html>