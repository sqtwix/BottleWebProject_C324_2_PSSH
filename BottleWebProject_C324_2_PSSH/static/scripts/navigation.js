// Подсветка активной вкладки
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentPath === linkPath) {
            link.classList.add('active');
        } else if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
            link.classList.add('active');
        }
    });
});

// Плавный переход между страницами
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Эффект затухания
        const content = document.querySelector('.body-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transition = 'opacity 0.15s ease';
        }
        
        setTimeout(() => {
            window.location.href = href;
        }, 150);
    });
});

// Анимация при загрузке (убираем класс loading)
window.addEventListener('load', function() {
    const content = document.querySelector('.body-content');
    if (content) {
        content.style.opacity = '1';
    }
});