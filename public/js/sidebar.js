(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
        // Делегирование событий для всего документа
        document.addEventListener('click', function(e) {
            const toggleButton = e.target.closest('.sidebar-nav-toggle');
            if (!toggleButton) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const group = toggleButton.closest('.sidebar-nav-group');
            if (!group) return;
            
            // Используем data-атрибут для идентификатора
            const menuId = toggleButton.dataset.menuId || 
                          'menu_' + toggleButton.textContent.trim().toLowerCase().replace(/\s+/g, '_');
            
            const isActive = group.classList.toggle('active');
            localStorage.setItem(menuId, isActive ? 'open' : 'closed');
            
            // Закрываем другие меню ТОГО ЖЕ УРОВНЯ
            closeSiblingMenusSameLevel(group, menuId);
        });

        // Восстановление состояния всех меню
        function restoreAllMenuStates() {
            const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
            
            toggleButtons.forEach(button => {
                const group = button.closest('.sidebar-nav-group');
                if (!group) return;
                
                const menuId = button.dataset.menuId || 
                              'menu_' + button.textContent.trim().toLowerCase().replace(/\s+/g, '_');
                
                if (localStorage.getItem(menuId) === 'open') {
                    group.classList.add('active');
                }
            });
        }

        // Функция для закрытия меню ТОГО ЖЕ УРОВНЯ
        function closeSiblingMenusSameLevel(currentGroup, currentMenuId) {
            const parent = currentGroup.parentElement;
            if (!parent) return;
            
            // Определяем уровень текущей группы
            const currentLevel = getNavGroupLevel(currentGroup);
            
            // Ищем только группы ТОГО ЖЕ УРОВНЯ в том же родителе
            const siblingGroups = parent.querySelectorAll('.sidebar-nav-group');
            siblingGroups.forEach(siblingGroup => {
                if (siblingGroup !== currentGroup) {
                    const siblingLevel = getNavGroupLevel(siblingGroup);
                    
                    // Закрываем только группы ТОГО ЖЕ УРОВНЯ
                    if (siblingLevel === currentLevel) {
                        const siblingButton = siblingGroup.querySelector('.sidebar-nav-toggle');
                        if (siblingButton) {
                            const siblingMenuId = siblingButton.dataset.menuId || 
                                                'menu_' + siblingButton.textContent.trim().toLowerCase().replace(/\s+/g, '_');
                            if (siblingMenuId !== currentMenuId) {
                                siblingGroup.classList.remove('active');
                                localStorage.setItem(siblingMenuId, 'closed');
                            }
                        }
                    }
                }
            });
        }

        // Функция для определения уровня группы
        function getNavGroupLevel(group) {
            if (group.classList.contains('sidebar-nav-group_1')) return 1;
            if (group.classList.contains('sidebar-nav-group_2')) return 2;
            if (group.classList.contains('sidebar-nav-group_3')) return 3;
            return 1; // По умолчанию
        }

        // Автоматическое раскрытие для активной страницы
        function autoExpandActiveMenu() {
            const activeLinks = document.querySelectorAll('.sidebar-nav-item.active');
            
            activeLinks.forEach(activeLink => {
                let parentGroup = activeLink.closest('.sidebar-nav-group');
                
                // Поднимаемся по иерархии и раскрываем все родительские группы
                while (parentGroup) {
                    const toggleButton = parentGroup.querySelector('.sidebar-nav-toggle');
                    if (toggleButton) {
                        const menuId = toggleButton.dataset.menuId || 
                                      'menu_' + toggleButton.textContent.trim().toLowerCase().replace(/\s+/g, '_');
                        parentGroup.classList.add('active');
                        localStorage.setItem(menuId, 'open');
                    }
                    parentGroup = parentGroup.parentElement?.closest('.sidebar-nav-group');
                }
            });
        }

        // Инициализация
        restoreAllMenuStates();
        autoExpandActiveMenu();

    });
})(document);