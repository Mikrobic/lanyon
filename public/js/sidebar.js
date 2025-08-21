// В assets/js/sidebar.js
(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
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
            
            if (menuId) {
                localStorage.setItem(menuId, isActive ? 'open' : 'closed');
            }
        });

        // Восстановление состояния
        document.querySelectorAll('.sidebar-nav-toggle').forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            const menuId = button.dataset.menuId;
            
            if (menuId && localStorage.getItem(menuId) === 'open') {
                group.classList.add('active');
            }
        });

        // Автораскрытие для активной страницы
        const activeItem = document.querySelector('.sidebar-nav-item.active');
        if (activeItem) {
            let parent = activeItem.closest('.sidebar-nav-group');
            while (parent) {
                parent.classList.add('active');
                const toggleBtn = parent.querySelector('.sidebar-nav-toggle');
                if (toggleBtn && toggleBtn.dataset.menuId) {
                    localStorage.setItem(toggleBtn.dataset.menuId, 'open');
                }
                parent = parent.parentElement?.closest('.sidebar-nav-group');
            }
        }
    });
})(document);