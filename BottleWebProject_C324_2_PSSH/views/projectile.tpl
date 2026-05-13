% rebase('layout.tpl', title='Home Page', year=year)

<div class="projectile-module-grid">
    <div class="projectile-module-card">
        <div class="projectile-module-row-grid">
            <h1 class="header-center">Тело, брошенное под углом к горизонту</h1>
            <p class="paragraph-center">Посмотрите, как ведет себя тело, брошенное под углом к горизонту, с учетм аэродинамического воздействия.</p>
        </div>
    </div>
    <div class="projectile-module-card-animated">
        <div class="projectile-module-row-grid">
            <h1 class="header">Прочитайте теорию!</h1>
            <p class="paragraph">Это поможешь вам разобраться в том, как ведет себя тела при броске под углом к горизонту с учетом аэродинимаического воздействия.</p>
            <button class="btn">Теория</button>
        </div>
    </div>
    <div class="projectile-module-card-animated">
        <div class="projectile-module-row-grid">
            <h1 class="header">Просмотрите практику!</h1>
            <p class="paragraph">После прочтения теории рекомендую обратиться к практическому примеру для более лучшего понимания.</p>
            <button class="btn">Практика</button>
        </div>
    </div>
    <div class="projectile-module-card">
        <h1 class="header">Модель</h1>
        <div class="canvas-container">
            <canvas id="coordinateCanvas" width="400" height="400"></canvas>
        </div>
        </div>
            <div class="projectile-module-column-grid">

                <div class="projectile-module-card-animated">
                    <h1>Рассчеты</h1>
                </div>

                <div class="projectile-module-card-animated">
                    <div class="projectile-module-row-grid">
                        <h1 class="header">Введите данные</h1>
                        <input placeholder="Введите массу объетка"/>
                        <input placeholder="Введите коэфициент сопротивления воздуха"/>
                        <input placeholder="Введите начальную скорость"/>
                        <input placeholder="Введите угол броска тела"/>
                        <input placeholder="Введите разность времени"/>
                        <button class="btn">Рассчитать</button>
                    </div>
                </div>
            </div>
        </div>
</div>
