% rebase('layout.tpl', title=title, year=year)

<div class="hero">
    <h1>Контакты</h1>
    <p>Свяжитесь с нами по любым вопросам</p>
</div>

<div class="contacts-page">
    <div class="students-grid contacts-grid">
        <!-- Левая карточка с реквизитами (темная) -->
        <div class="card">
            <h3>Наши реквизиты</h3>
            <div class="requisites-content">
                <div class="requisites-block">
                    <p><strong>Адрес:</strong></p> <!-- тег strong - это тег стилевой, лучше его не использовать --> 
                    <p>190000, г. Санкт-Петербург,<br>Московский проспект 149 ВА</p>
                </div>
                <div class="requisites-block">
                    <p><strong>🕿: +7 (811) 223 11 55</strong></p>
                </div>
                <div class="requisites-block">
                    <p><strong>📧: info@physlab.guap.ru</strong></p>
                </div>
            </div>
        </div>

        <!-- Правая карточка с формой (светлая, акцентная) -->
        <div class="card card-inverse">
            <h3>Написать нам</h3>
            <form action="/send-message" method="post" class="contact-form">
                <input type="text" id="name" name="name" placeholder="Ваше имя (Иванов Иван)" required>
                <input type="email" id="email" name="email" placeholder="Ваш Email (ivan@example.com)" required>
                <textarea id="message" name="message" rows="4" placeholder="Ваше сообщение..." required></textarea>
                <button type="submit" class="btn btn-primary">Отправить</button>
            </form>
        </div>
    </div>
</div>

<div class="card developers-card">
    <h3>Разработчики сайта</h3>
    <div class="developers-grid">
        <div class="developer-item">
            <p><strong>Прокудин А.</strong></p>
            <p class="developer-role">Модель движения тела</p>
        </div>
        <div class="developer-item">
            <p><strong>Симоненко С.</strong></p>
            <p class="developer-role">Модель парусной лодки</p>
        </div>
        <div class="developer-item">
            <p><strong>Шульга И.</strong></p>
            <p class="developer-role">Модель теплопроводности</p>
        </div>
    </div>
</div>