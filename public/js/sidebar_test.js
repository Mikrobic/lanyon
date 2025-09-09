class SidebarMenu {
    constructor(selector = '.sidebar-nav-group') {
        this.menuGroups = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        // Восстановление состояния из localStorage для всех уровней toggle
        this.restoreMenuState();
        
        // Автораскрытие активного меню
        this.autoExpandActiveMenus();

        // Инициализация кликов
        this.initClicks();
    }

    restoreMenuState() {
        document.querySelectorAll('.sidebar-nav-toggle, .sidebar-nav-toggle_2').forEach(button => {
            const group = button.closest('.sidebar-nav-group');
            const menuId = button.dataset.menuId;
            
            if (menuId && localStorage.getItem(menuId) === 'open') {
                group.classList.add('active');
            }
        });
    }

    autoExpandActiveMenus() {
        const activeItems = document.querySelectorAll('.sidebar-nav-item.active');
        activeItems.forEach(item => {
            let parent = item.closest('.sidebar-nav-group');
            while (parent) {
                parent.classList.add('active');
                const toggleBtn = parent.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
                if (toggleBtn && toggleBtn.dataset.menuId) {
                    localStorage.setItem(toggleBtn.dataset.menuId, 'open');
                }
                parent = parent.parentElement?.closest('.sidebar-nav-group');
            }
        });
    }

    initClicks() {
        this.menuGroups.forEach(group => {
            const toggle = group.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleGroup(group, toggle);
                });
            }
        });
    }

    toggleGroup(group, toggle) {
        const isActive = group.classList.contains('active');
        
        // Закрываем только дочерние элементы текущей группы
        this.closeChildren(group);
        
        if (isActive) {
            group.classList.remove('active');
            this.updateLocalStorage(toggle, 'closed');
        } else {
            group.classList.add('active');
            this.updateLocalStorage(toggle, 'open');
            // Закрываем другие меню ТОГО ЖЕ УРОВНЯ
            this.closeSiblingMenusSameLevel(group);
        }
    }

    closeChildren(parentGroup) {
        const children = parentGroup.querySelectorAll('.sidebar-nav-group');
        children.forEach(child => {
            child.classList.remove('active');
            const childToggle = child.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
            if (childToggle && childToggle.dataset.menuId) {
                localStorage.setItem(childToggle.dataset.menuId, 'closed');
            }
        });
    }

    closeSiblingMenusSameLevel(currentGroup) {
        const parent = currentGroup.parentElement;
        if (!parent) return;
        
        const currentLevel = this.getNavGroupLevel(currentGroup);
        
        parent.querySelectorAll('.sidebar-nav-group').forEach(siblingGroup => {
            if (siblingGroup !== currentGroup) {
                const siblingLevel = this.getNavGroupLevel(siblingGroup);
                if (siblingLevel === currentLevel) {
                    const siblingButton = siblingGroup.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
                    if (siblingButton && siblingButton.dataset.menuId) {
                        siblingGroup.classList.remove('active');
                        localStorage.setItem(siblingButton.dataset.menuId, 'closed');
                    }
                }
            }
        });
    }

    getNavGroupLevel(group) {
        if (group.classList.contains('sidebar-nav-group_2')) return 2;
        if (group.classList.contains('sidebar-nav-group')) return 1;
        return 1;
    }

    updateLocalStorage(toggle, state) {
        const menuId = toggle.dataset.menuId;
        if (menuId) {
            localStorage.setItem(menuId, state);
        }
    }

    // Методы для программного управления
    openGroup(selector) {
        const group = document.querySelector(selector);
        if (group) {
            group.classList.add('active');
            const toggle = group.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
            if (toggle) {
                this.updateLocalStorage(toggle, 'open');
            }
        }
    }

    closeGroup(selector) {
        const group = document.querySelector(selector);
        if (group) {
            group.classList.remove('active');
            const toggle = group.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
            if (toggle) {
                this.updateLocalStorage(toggle, 'closed');
            }
        }
    }

    closeAll() {
        this.menuGroups.forEach(group => {
            group.classList.remove('active');
            const toggle = group.querySelector('.sidebar-nav-toggle, .sidebar-nav-toggle_2');
            if (toggle && toggle.dataset.menuId) {
                localStorage.setItem(toggle.dataset.menuId, 'closed');
            }
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarMenu = new SidebarMenu();
});