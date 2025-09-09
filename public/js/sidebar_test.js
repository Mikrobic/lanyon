class SidebarMenu {
    constructor(selector = '.sidebar-nav-group') {
        this.menuGroups = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        // Восстановление состояния из localStorage
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
        }
        
        // УБРАНО: закрытие других меню того же уровня
        // Теперь кнопки не влияют друг на друга при нажатии
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
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarMenu = new SidebarMenu();
});