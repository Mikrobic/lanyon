(function(document) {
    // Сохраняем состояние сайдбара
    const sidebarCheckbox = document.getElementById('sidebar-checkbox');
    const sidebar = document.querySelector('#sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    // Восстановление состояния сайдбара
    if (localStorage.getItem('sidebarState') === 'open') {
        sidebarCheckbox.checked = true;
    }

    // Обработчик изменений состояния сайдбара
    sidebarCheckbox.addEventListener('change', function() {
        localStorage.setItem('sidebarState', this.checked ? 'open' : 'closed');
    });

    // Закрытие сайдбара при клике на него
    sidebar.addEventListener('click', function(e) {
        if (e.target === sidebar && sidebarCheckbox.checked) {
            sidebarCheckbox.checked = false;
            localStorage.setItem('sidebarState', 'closed');
            e.stopPropagation();
        }
    });

    // Обработчик для кнопки переключения сайдбара
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarCheckbox.checked = !sidebarCheckbox.checked;
            localStorage.setItem('sidebarState', sidebarCheckbox.checked ? 'open' : 'closed');
        });
    }

    // Закрытие сайдбара при клике вне его области
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (!sidebarCheckbox.checked || sidebar.contains(target) || target === sidebarCheckbox || target === sidebarToggle) return;
        sidebarCheckbox.checked = false;
        localStorage.setItem('sidebarState', 'closed');
    });

    // Обработчики для раскрывающихся меню внутри сайдбара
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
        
        // Функция для закрытия всех групп меню
        function closeAllMenuGroups() {
            document.querySelectorAll('.sidebar-nav-group.active').forEach(group => {
                group.classList.remove('active');
                const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
                localStorage.setItem(menuId, 'closed');
            });
        }

        toggleButtons.forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            if (!group) return;
            
            // Восстановление состояния меню из localStorage
            const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
            if (localStorage.getItem(menuId) === 'open') {
                group.classList.add('active');
            }
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Закрываем все другие группы перед открытием текущей
                if (!group.classList.contains('active')) {
                    closeAllMenuGroups();
                }
                
                group.classList.toggle('active');
                
                // Сохранение состояния меню в localStorage
                const currentMenuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
                localStorage.setItem(currentMenuId, group.classList.contains('active') ? 'open' : 'closed');
            });
        });

        // Автоматически раскрываем меню для активной страницы
        const activeSubItem = document.querySelector('.sidebar-submenu .active');
        if (activeSubItem) {
            const parentGroup = activeSubItem.closest('.sidebar-nav-group');
            if (parentGroup) {
                // Закрываем все группы перед открытием активной
                closeAllMenuGroups();
                
                parentGroup.classList.add('active');
                const menuId = 'menu_' + parentGroup.querySelector('a').textContent.trim().toLowerCase();
                localStorage.setItem(menuId, 'open');
            }
        }

        // Дополнительно: закрытие меню при закрытии сайдбара
        sidebarCheckbox.addEventListener('change', function() {
            if (!this.checked) {
                closeAllMenuGroups();
            }
        });
    });
})(document);