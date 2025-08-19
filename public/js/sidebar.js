(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.querySelector('.sidebar'); // Предполагаем, что сайдбар имеет класс .sidebar
        const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
        
        // Функция для закрытия всех групп сайдбара
        function closeAllSidebarGroups() {
            document.querySelectorAll('.sidebar-nav-group.active').forEach(group => {
                group.classList.remove('active');
                const button = group.querySelector('.sidebar-nav-toggle');
                if (button) {
                    const buttonText = button.textContent.trim();
                    const menuId = 'menu_' + (group.id || buttonText.toLowerCase().replace(/\s+/g, '_'));
                    localStorage.setItem(menuId, 'closed');
                }
            });
        }
        
        // Обработчик клика по документу
        document.addEventListener('click', function(e) {
            // Если клик был не по сайдбару и не по кнопке переключения сайдбара
            if (!sidebar.contains(e.target) && !e.target.closest('.sidebar-nav-toggle')) {
                closeAllSidebarGroups();
            }
        });
        
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
                
                // Закрываем другие группы при открытии текущей
                if (isActive) {
                    document.querySelectorAll('.sidebar-nav-group.active').forEach(otherGroup => {
                        if (otherGroup !== group) {
                            otherGroup.classList.remove('active');
                            const otherButton = otherGroup.querySelector('.sidebar-nav-toggle');
                            if (otherButton) {
                                const otherButtonText = otherButton.textContent.trim();
                                const otherMenuId = 'menu_' + (otherGroup.id || otherButtonText.toLowerCase().replace(/\s+/g, '_'));
                                localStorage.setItem(otherMenuId, 'closed');
                            }
                        }
                    });
                }
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