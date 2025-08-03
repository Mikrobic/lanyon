(function(document) {
  // Функция для управления основным сайдбаром
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);

  // Функция для управления раскрывающимися подменю
  document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для раскрывающегося меню
    document.querySelectorAll('.submenu-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Предотвращаем всплытие, чтобы не закрыть сайдбар
        
        const menu = this.closest('.sidebar-nav-menu');
        menu.classList.toggle('active');
        
        // Закрываем другие открытые меню
        document.querySelectorAll('.sidebar-nav-menu').forEach(function(otherMenu) {
          if (otherMenu !== menu) {
            otherMenu.classList.remove('active');
          }
        });
      });
    });

    // Автоматически раскрываем меню если текущая страница вложенная
    if (document.querySelector('.sidebar-nav-subitem.active')) {
      const activeMenu = document.querySelector('.sidebar-nav-subitem.active').closest('.sidebar-nav-menu');
      if (activeMenu) {
        activeMenu.classList.add('active');
      }
    }
  });
})(document);
