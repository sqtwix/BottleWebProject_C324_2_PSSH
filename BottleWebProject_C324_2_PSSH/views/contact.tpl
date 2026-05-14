% rebase('layout.tpl', title=title, year=year)

<div class="hero">
    <h1>Контакты</h1>
    <p>Свяжитесь с нами по любым вопросам</p>
</div>

<div class="students-grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div class="card" style="height: 100%;">
        <h3>Наши реквизиты</h3>
        <div style="margin-top: 1.5rem;">
            <p><strong>Адрес:</strong></p>
            <p>190000, г. Санкт-Петербург,<br>Московский проспект 149 ВА</p>
        </div>
        <div style="margin-top: 1.5rem;">
            <p><strong>Телефон:</strong></p>
            <p>+7 (811) 223 11 55</p>
        </div>
        <div style="margin-top: 1.5rem;">
            <p><strong>Email:</strong></p>
            <p>info@physlab.guap.ru</p>
            <p>support@physlab.guap.ru</p>
        </div>
    </div>

    <div class="card" style="height: 100%;">
        <h3>Написать нам</h3>
        <form action="/send-message" method="post">
            <label for="name">Ваше имя</label>
            <input type="text" id="name" name="name" placeholder="Иванов Иван" required>
            
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="ivan@example.com" required>
            
            <label for="message">Сообщение</label>
            <textarea id="message" name="message" rows="4" placeholder="Ваше сообщение..." required></textarea>
            
            <button type="submit" class="btn">Отправить</button>
        </form>
    </div>
</div>

<div class="card">
    <h3>Разработчики сайта</h3>
    <div class="students-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
        <div>
            <p><strong>Прокудин А.</strong></p>
            <p style="font-size: 0.85rem; color: var(--accent-muted);">Модель движения тела</p>
        </div>
        <div>
            <p><strong>Симоненко С.</strong></p>
            <p style="font-size: 0.85rem; color: var(--accent-muted);">Модель парусной лодки</p>
        </div>
        <div>
            <p><strong>Шульга И.</strong></p>
            <p style="font-size: 0.85rem; color: var(--accent-muted);">Модель теплопроводности</p>
        </div>
    </div>
</div>