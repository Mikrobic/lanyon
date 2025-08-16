<script>
(function(document) {
  // Инициализация DOM элементов
  const sidebarCheckbox = document.getElementById('sidebar-checkbox');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  // Функция переключения сайдбара
  function toggleSidebar() {
    sidebarCheckbox.checked = !sidebarCheckbox.checked;
    localStorage.setItem('sidebarState', sidebarCheckbox.checked ? 'open' : 'closed');
  }

  // Инициализация состояния сайдбара
  function initSidebar() {
    const savedState = localStorage.getItem('sidebarState');
    const isLargeScreen = window.innerWidth >= 768;
    
    sidebarCheckbox.checked = isLargeScreen || savedState === 'open';
  }

  // Инициализация подменю
  function initDropdownMenus() {
    document.querySelectorAll('.sidebar-nav-toggle').forEach(toggle => {
      const group = toggle.closest('.sidebar-nav-group');
      
      // Восстановление состояния
      const menuId = 'menu_' + toggle.textContent.trim().toLowerCase();
      if (localStorage.getItem(menuId) === 'open') {
        group.classList.add('active');
      }

      // Обработчик клика
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        group.classList.toggle('active');
        localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
      });
    });
  }

  // Основная инициализация при загрузке
  document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initDropdownMenus();

    // Обработчик клика по гамбургеру
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });

    // Закрытие при клике вне сайдбара
    document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
        if (sidebarCheckbox.checked && window.innerWidth < 768) {
          toggleSidebar();
        }
      }
    });

    // Адаптация к размеру экрана
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        sidebarCheckbox.checked = true;
      } else {
        sidebarCheckbox.checked = localStorage.getItem('sidebarState') === 'open';
      }
    });
  });
})(document);
</script>