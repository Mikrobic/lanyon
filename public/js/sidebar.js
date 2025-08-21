(function(document) {
    // Функция для инициализации меню
    function initSidebarMenu() {
        // Восстановление состояния из localStorage
        document.querySelectorAll('.sidebar-nav-toggle').forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            const menuId = button.dataset.menuId;
            
            if (menuId && localStorage.getItem(menuId) === 'open') {
                group.classList.add('active');
            }
        });

        // Автораскрытие активного меню
        const activeItems = document.querySelectorAll('.sidebar-nav-item.active');
        activeItems.forEach(item => {
            let parent = item.closest('.sidebar-nav-group');
            while (parent) {
                parent.classList.add('active');
                const toggleBtn = parent.querySelector('.sidebar-nav-toggle');
                if (toggleBtn && toggleBtn.dataset.menuId) {
                    localStorage.setItem(toggleBtn.dataset.menuId, 'open');
                }
                parent = parent.parentElement?.closest('.sidebar-nav-group');
            }
        });
    }

    // Функция для закрытия меню того же уровня
    function closeSiblingMenusSameLevel(currentGroup) {
        const parent = currentGroup.parentElement;
        if (!parent) return;
        
        // Определяем уровень текущей группы
        const currentLevel = getNavGroupLevel(currentGroup);
        
        // Закрываем только группы того же уровня
        parent.querySelectorAll('.sidebar-nav-group').forEach(siblingGroup => {
            if (siblingGroup !== currentGroup) {
                const siblingLevel = getNavGroupLevel(siblingGroup);
                if (siblingLevel === currentLevel) {
                    const siblingButton = siblingGroup.querySelector('.sidebar-nav-toggle');
                    if (siblingButton && siblingButton.dataset.menuId) {
                        siblingGroup.classList.remove('active');
                        localStorage.setItem(siblingButton.dataset.menuId, 'closed');
                    }
                }
            }
        });
    }

    // Функция для определения уровня группы
    function getNavGroupLevel(group) {
        if (group.classList.contains('sidebar-nav-group')) return 1;
        if (group.classList.contains('sidebar-nav-group_2')) return 2;
        if (group.classList.contains('sidebar-nav-group_3')) return 3;
        return 1; // По умолчанию
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Инициализируем меню
        initSidebarMenu();
        
        // Делегирование событий
        document.addEventListener('click', function(e) {
            const toggleButton = e.target.closest('.sidebar-nav-toggle');
            if (!toggleButton) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const group = toggleButton.closest('.sidebar-nav-group');
            if (!group) return;
            
            const menuId = toggleButton.dataset.menuId;
            const isActive = group.classList.toggle('active');
            
            console.log('Toggle clicked:', menuId, isActive, 'Level:', getNavGroupLevel(group));
            
            if (menuId) {
                localStorage.setItem(menuId, isActive ? 'open' : 'closed');
            }
            
            // Закрываем другие меню ТОГО ЖЕ УРОВНЯ
            if (isActive) {
                closeSiblingMenusSameLevel(group);
            }
        });
    });
})(document);