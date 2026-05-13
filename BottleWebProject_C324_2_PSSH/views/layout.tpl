<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - Физическая лаборатория</title>
    <link rel="stylesheet" type="text/css" href="/static/content/style.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/home.css" />
</head>

<body>
    <header class="main-header">
        <div class="container">
            <a href="/" class="app-brand">Физическая лаборатория</a>
            <nav>
                <ul class="nav-row">
                    <li><a href="/" class="nav-link">Главная</a></li>
                    <li><a href="/about" class="nav-link">О нас</a></li>
                    <li><a href="/contact" class="nav-link">Контакты</a></li>
                    <li><a href="/projectile" class="nav-link">Движение тела</a></li>
                    <li><a href="/heat" class="nav-link">Теплопроводность</a></li>
                    <li><a href="/boat" class="nav-link">Парусная лодка</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container body-content">
        <section class="fade-in">
            {{!base}}
        </section>
        
        <hr class="separator" />
        
        <footer>
            <p>&copy; {{ year }} - Физическая лаборатория | Группа С324 | ГУАП</p>
        </footer>
    </main>

    <script src="/static/scripts/jquery-1.10.2.js"></script>
    <script src="/static/scripts/navigation.js"></script>
    <script src="/static/scripts/modal_logic.js"></script>
</body>
</html>