(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
        
        toggleButtons.forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            if (!group) return;
            
            // Используем текст из кнопки вместо ссылки
            const buttonText = button.textContent.trim();
            
            // Создаем идентификатор меню
            const menuId = 'menu_' + (group.id || buttonText.toLowerCase().replace(/\s+/g, '_'));
            
            // Восстановление состояния из localStorage
            if (localStorage.getItem(menuId) === 'open') {
                group.classList.add('active');
            }
            
            // Обработчик клика для кнопки
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const isActive = group.classList.toggle('active');
                localStorage.setItem(menuId, isActive ? 'open' : 'closed');
            });
        });

        // Автоматическое раскрытие для активной страницы
        const activeSubItem = document.querySelector('.sidebar-submenu .active');
        if (activeSubItem) {
            const parentGroup = activeSubItem.closest('.sidebar-nav-group');
            if (parentGroup) {
                const button = parentGroup.querySelector('.sidebar-nav-toggle');
                if (button) {
                    const buttonText = button.textContent.trim();
                    const menuId = 'menu_' + (parentGroup.id || buttonText.toLowerCase().replace(/\s+/g, '_'));
                    parentGroup.classList.add('active');
                    localStorage.setItem(menuId, 'open');
                }
            }
        }
    });
})(document);