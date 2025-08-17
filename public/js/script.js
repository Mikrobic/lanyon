document.addEventListener('DOMContentLoaded', function() {
  // Функция для работы сайдбара
  function initSidebar() {
    const sidebarCheckbox = document.getElementById('sidebar-checkbox');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    // Восстановление состояния
    if (localStorage.getItem('sidebarState') === 'open') {
      sidebarCheckbox.checked = true;
    }

    // Обработчики событий
    sidebarCheckbox.addEventListener('change', function() {
      localStorage.setItem('sidebarState', this.checked ? 'open' : 'closed');
    });

    sidebar.addEventListener('click', function(e) {
      if (e.target === sidebar && sidebarCheckbox.checked) {
        sidebarCheckbox.checked = false;
        localStorage.setItem('sidebarState', 'closed');
        e.stopPropagation();
      }
    });

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function(e) {
        e.preventDefault();
        sidebarCheckbox.checked = !sidebarCheckbox.checked;
        localStorage.setItem('sidebarState', sidebarCheckbox.checked ? 'open' : 'closed');
      });
    }

    document.addEventListener('click', function(e) {
      if (!sidebarCheckbox.checked || 
          sidebar.contains(e.target) || 
          e.target === sidebarCheckbox) return;
      sidebarCheckbox.checked = false;
      localStorage.setItem('sidebarState', 'closed');
    });
  }

  // Функция для работы подменю
  function initSubmenus() {
    document.querySelectorAll('.sidebar-nav-toggle').forEach(button => {
      const group = button.closest('.sidebar-nav-group');
      const menuId = 'menu_' + button.textContent.trim().toLowerCase();
      
      // Восстановление состояния
      if (localStorage.getItem(menuId) === 'open') {
        group.classList.add('active');
      }
      
      // Обработчик клика
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        group.classList.toggle('active');
        localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
      });
    });
  }

  // Инициализация
  initSidebar();
  initSubmenus();

  // Автоматическое раскрытие активного меню
  const activeSubItem = document.querySelector('.submenu-item.active');
  if (activeSubItem) {
    const parentGroup = activeSubItem.closest('.sidebar-nav-group');
    if (parentGroup) {
      parentGroup.classList.add('active');
      const menuId = 'menu_' + parentGroup.querySelector('.sidebar-nav-toggle').textContent.trim().toLowerCase();
      localStorage.setItem(menuId, 'open');
    }
  }
});