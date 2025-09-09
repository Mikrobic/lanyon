class SidebarMenu {
    constructor(selector = '.sidebar-nav-group') {
        this.menuGroups = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.menuGroups.forEach(group => {
            const toggle = group.querySelector('.sidebar-nav-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleGroup(group);
                });
            }
        });
    }

    toggleGroup(group) {
        const isActive = group.classList.contains('active');
        
        // Закрываем только дочерние элементы текущей группы
        this.closeChildren(group);
        
        if (isActive) {
            group.classList.remove('active');
        } else {
            group.classList.add('active');
        }
    }

    closeChildren(parentGroup) {
        // Закрываем только вложенные меню внутри текущей группы
        const children = parentGroup.querySelectorAll('.sidebar-nav-group');
        children.forEach(child => {
            child.classList.remove('active');
        });
    }

    // Методы для программного управления
    openGroup(selector) {
        const group = document.querySelector(selector);
        if (group) {
            group.classList.add('active');
        }
    }

    closeGroup(selector) {
        const group = document.querySelector(selector);
        if (group) {
            group.classList.remove('active');
        }
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarMenu = new SidebarMenu();
});