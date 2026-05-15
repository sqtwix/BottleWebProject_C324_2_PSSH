// Обработчик плавной прокрутки к панели ввода
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scrollToInputsBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const inputsPanel = document.getElementById('inputsPanel');
            if (inputsPanel) {
                inputsPanel.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});