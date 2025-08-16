;(function(document) {
  // Обработчики для раскрывающихся меню
  function initDropdownMenus() {
    const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
    
    toggleButtons.forEach(button => {
      const group = button.closest('.sidebar-nav-group');
      
      // Восстановление состояния из localStorage
      const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
      if (localStorage.getItem(menuId) === 'open') {
        group.classList.add('active');
      }
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        group.classList.toggle('active');
        
        // Сохранение состояния в localStorage
        const menuId = 'menu_' + group.querySelector('a').textContent.trim().toLowerCase();
        localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
      });
    });

    // Автоматически раскрываем меню, если активен пункт подменю
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

  // Инициализация при загрузке документа
  document.addEventListener('DOMContentLoaded', function() {
    initDropdownMenus();
    
    // Ваш остальной код для сайдбара...
  });

})(document);