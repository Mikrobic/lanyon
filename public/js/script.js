(function(document) {
  // Элементы для управления сайдбаром
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  // Закрытие сайдбара при клике вне его
  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);

  // Управление подменю
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
