(function(document) {
  // Сохраняем состояние сайдбара
  const sidebarCheckbox = document.getElementById('sidebar-checkbox');
  
  // Восстановление состояния сайдбара
  if (localStorage.getItem('sidebarState') === 'open') {
    sidebarCheckbox.checked = true;
  }

  // Обработчик изменений состояния сайдбара
  sidebarCheckbox.addEventListener('change', function() {
    localStorage.setItem('sidebarState', this.checked ? 'open' : 'closed');
  });

  // Оригинальный код для закрытия сайдбара
  var sidebar = document.querySelector('#sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');

  // Закрытие сайдбара при клике на него
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
    var target = e.target;
    if (!sidebarCheckbox.checked || sidebar.contains(target) || target === sidebarCheckbox) return;
    sidebarCheckbox.checked = false;
    localStorage.setItem('sidebarState', 'closed');
  });

  // Обработчики для раскрывающихся меню
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
    
    toggleButtons.forEach(button => {
      const group = button.closest('.sidebar-nav-group');
      
      // Восстановление состояния меню из localStorage
      const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
      if (localStorage.getItem(menuId) === 'open') {
        group.classList.add('active');
      }
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        group.classList.toggle('active');
        
        // Сохранение состояния меню в localStorage
        const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
        localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
      });
    });

    // Автоматически раскрываем меню для активной страницы
    const activeSubItem = document.querySelector('.sidebar-submenu .active');
    if (activeSubItem) {
      const parentGroup = activeSubItem.closest('.sidebar-nav-group');
      if (parentGroup) {
        parentGroup.classList.add('active');
        const menuId = 'menu_' + parentGroup.querySelector('a').textContent.trim().toLowerCase();
        localStorage.setItem(menuId, 'open');
      }
    }
  });
})(document);
