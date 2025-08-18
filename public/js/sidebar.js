(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
        
        toggleButtons.forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            if (!group) return;
            
            // Используем текст из кнопки для создания идентификатора
            const buttonText = button.textContent.trim();
            const menuId = 'menu_' + buttonText.toLowerCase().replace(/\s+/g, '_');
            
            // Восстановление состояния из localStorage
            if (localStorage.getItem(menuId) {
                if (localStorage.getItem(menuId) === 'open') {
                    group.classList.add('active');
                } else {
                    group.classList.remove('active');
                }
            }
            
            // Обработчик клика для кнопки
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                group.classList.toggle('active');
                localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
            });
        });

        // Автоматическое раскрытие для активной страницы
        const currentPath = window.location.pathname;
        const activeItem = document.querySelector(`.sidebar-nav-item[href="${currentPath}"]`);
        
        if (activeItem && activeItem.classList.contains('submenu-item')) {
            const parentGroup = activeItem.closest('.sidebar-nav-group');
            if (parentGroup) {
                const button = parentGroup.querySelector('.sidebar-nav-toggle');
                if (button) {
                    const buttonText = button.textContent.trim();
                    const menuId = 'menu_' + buttonText.toLowerCase().replace(/\s+/g, '_');
                    parentGroup.classList.add('active');
                    localStorage.setItem(menuId, 'open');
                }
            }
        }
    });
})(document);