% rebase('layout.tpl', title='Home Page', year=year)

<div class="hero">
    <h1>Лаборатория вычислительной физики</h1>
    <p>Численное моделирование физических процессов с использованием современных методов программирования</p>
</div>

<h2 style="text-align: center; margin: 2rem 0 1rem;">Наша команда</h2>
<p style="text-align: center; margin-bottom: 2rem;">Каждый участник разработал собственную физическую симуляцию</p>

<div class="students-grid">
    <!-- Студент 1: Прокудин Александр -->
    <div class="student-card">
        <div class="student-card-content">
           <div class="student-avatar">
                <img src="/static/images/aleks_dev_avatar.jpg" alt="Прокудин Александр">
            </div>
            <div class="student-name">Прокудин Александр</div>
            <div class="student-topic">Физика 2D-движения с ветром</div>
            <div class="student-description">
                <strong>Тема проекта:</strong> Движение тела, брошенного под углом к горизонту, 
                с учётом попутного ветра и сопротивления воздуха, пропорционального квадрату скорости
            </div>
            <div class="tags">
                <span class="tag">Баллистика</span>
                <span class="tag">Сопротивление воздуха</span>
                <span class="tag">Квадратичная зависимость</span>
                <span class="tag">Попутный ветер</span>
            </div>
            <div class="student-description">
                <strong>Модель:</strong> Численное интегрирование уравнений движения методом Эйлера. 
                Учёт силы лобового сопротивления и попутного ветра, 
                изменяющего относительную скорость тела.
            </div>
            <div class="tags">
                <span class="tag">Дальность полёта</span>
                <span class="tag">Максимальная высота</span>
                <span class="tag">Время полёта</span>
            </div>
        </div>
        <a href="/projectile" class="sim-link">Перейти к симуляции →</a>
    </div>

    <div class="student-card">
        <div class="student-card-content">
            <div class="student-avatar">
                <img src="/static/images/sonay_dev_avatar.jpg" alt="София Симоненок">
            </div>
            <div class="student-name">Симоненко София</div>
            <div class="student-topic">Гидродинамика и оптимизация</div>
            <div class="student-description">
                <strong>Тема проекта:</strong> Модель движения парусной лодки по реке 
                с учётом ветра и течения. Оптимизация угла паруса для максимальной скорости
            </div>
            <div class="tags">
                <span class="tag">Парусная лодка</span>
                <span class="tag">Ветер и течение</span>
                <span class="tag">Оптимизация</span>
            </div>
            <div class="student-description">
                <strong>Модель:</strong> Уравнение движения с учётом силы тяги паруса, 
                силы сопротивления воды. <br>
                <strong>Оптимизация:</strong> Численный поиск оптимального угла паруса, 
                обеспечивающего максимальную установившуюся скорость лодки.
            </div>
            <div class="tags">
                <span class="tag">Максимальная скорость</span>
                <span class="tag">Оптимальный угол</span>
            </div>
        </div>
        <a href="/boat" class="sim-link">Перейти к симуляции →</a>
    </div>

    <div class="student-card">
        <div class="student-card-content">
             <div class="student-avatar">
                <img src="/static/images/ivan_dev_avatar.jpg" alt="Шульга Иван">
            </div>
            <div class="student-name">Шульга Иван</div>
            <div class="student-topic">Теплофизика</div>
            <div class="student-description">
                <strong>Тема проекта:</strong> Теплопроводность металлического стержня. 
                Распределение температуры вдоль стержня с заданными граничными условиями
            </div>
            <div class="tags">
                <span class="tag">Уравнение теплопроводности</span>
                <span class="tag">Стационарный режим</span>
                <span class="tag">Граничные условия</span>
            </div>
            <div class="student-description">
                <strong>Модель:</strong> Стационарное уравнение теплопроводности с граничными условиями.<br>
                <strong>Численный метод:</strong> Конечно-разностная схема (метод прогонки) для 
                неоднородного стержня. Визуализация линейного и нелинейного распределения 
                температуры при различных теплопроводностях.
            </div>
            <div class="tags">
                <span class="tag">Температурный профиль</span>
                <span class="tag">График</span>
            </div>
        </div>
        <a href="/heat" class="sim-link">Перейти к симуляции →</a>
    </div>
</div>

<div class="card">
    <h1>О проекте</h3>
    <p>«Физическая лаборатория» — это веб-приложение для численного решения и визуализации физических задач. Приложение предназначено для образовательных целей и позволяет студентам, преподавателям и исследователям моделировать физические процессы в реальном времени без необходимости написания программного кода.</p>
</div>