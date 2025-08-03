(function(document) {
  // Инициализация сайдбара
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');
  
  // Закрытие сайдбара при клике вне его области
  document.addEventListener('click', function(e) {
    var target = e.target;
    if (!checkbox.checked || sidebar.contains(target) || target === checkbox) return;
    checkbox.checked = false;
  });

  // Обработка подменю
  document.addEventListener('DOMContentLoaded', function() {
    // Автоматическое раскрытие активного меню
    const activeItem = document.querySelector('.sidebar-nav-subitem.active');
    if (activeItem) {
      activeItem.closest('.sidebar-nav-menu').classList.add('active');
    }

    // Обработчики кликов для подменю
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const menu = this.closest('.sidebar-nav-menu');
        menu.classList.toggle('active');
        
        // Закрытие других меню
        document.querySelectorAll('.sidebar-nav-menu').forEach(other => {
          if (other !== menu) other.classList.remove('active');
        });
      });
    });
  });
})(document);
