(function() {
  // Основная функция для сайдбара
  function initSidebar() {
    const sidebarCheckbox = document.getElementById('sidebar-checkbox');
    const sidebar = document.querySelector('#sidebar');
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
      const target = e.target;
      if (!sidebarCheckbox.checked || sidebar.contains(target) || target === sidebarCheckbox) return;
      sidebarCheckbox.checked = false;
      localStorage.setItem('sidebarState', 'closed');
    });
  }

  // Функция для подменю
  function initSubmenus() {
    const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
    
    toggleButtons.forEach(button => {
      const group = button.closest('.sidebar-nav-group');
      const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
      
      if (localStorage.getItem(menuId) === 'open') {
        group.classList.add('active');
      }
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        group.classList.toggle('active');
        localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
      });
    });

    // Автоматическое раскрытие для активной страницы
    const activeSubItem = document.querySelector('.sidebar-submenu .active');
    if (activeSubItem) {
      const parentGroup = activeSubItem.closest('.sidebar-nav-group');
      if (parentGroup) {
        parentGroup.classList.add('active');
        const menuId = 'menu_' + parentGroup.querySelector('a').textContent.trim().toLowerCase();
        localStorage.setItem(menuId, 'open');
      }
    }
  }

  // Инициализация после полной загрузки DOM
  document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initSubmenus();
  });
})();