(function(document) {
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
        
        toggleButtons.forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            if (!group) return;
            
            const link = group.querySelector('a');
            if (!link) return;
            
            // Более надежный способ получения идентификатора
            const menuId = 'menu_' + (group.id || link.textContent.trim().toLowerCase().replace(/\s+/g, '_'));
            
            // Восстановление состояния
            if (localStorage.getItem(menuId) === 'open') {
                group.classList.add('active');
            }
            
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
                const link = parentGroup.querySelector('a');
                if (link) {
                    const menuId = 'menu_' + (parentGroup.id || link.textContent.trim().toLowerCase().replace(/\s+/g, '_'));
                    parentGroup.classList.add('active');
                    localStorage.setItem(menuId, 'open');
                }
            }
        }
    });
})(document);