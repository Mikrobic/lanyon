(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
        // Делегирование событий на весь документ
        document.addEventListener('click', function(e) {
            const toggleButton = e.target.closest('.sidebar-nav-toggle');
            if (!toggleButton) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const group = toggleButton.closest('.sidebar-nav-group');
            if (!group) return;
            
            // Используем текст из кнопки вместо ссылки
            const buttonText = toggleButton.textContent.trim();
            
            // Создаем идентификатор меню
            const menuId = 'menu_' + (group.id || buttonText.toLowerCase().replace(/\s+/g, '_'));
            
            const isActive = group.classList.toggle('active');
            localStorage.setItem(menuId, isActive ? 'open' : 'closed');
        });

        // Восстановление состояния из localStorage для всех элементов
        function restoreMenuStates() {
            const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
            
            toggleButtons.forEach(button => {
                const group = button.closest('.sidebar-nav-group');
                if (!group) return;
                
                const buttonText = button.textContent.trim();
                const menuId = 'menu_' + (group.id || buttonText.toLowerCase().replace(/\s+/g, '_'));
                
                if (localStorage.getItem(menuId) === 'open') {
                    group.classList.add('active');
                }
            });
        }

        // Вызываем при загрузке
        restoreMenuStates();

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