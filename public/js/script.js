<script>
(function(document) {
  // Initialize sidebar state
  document.addEventListener('DOMContentLoaded', function() {
    const sidebarCheckbox = document.getElementById('sidebar-checkbox');
    
    // Set initial state based on viewport
    if (window.innerWidth >= 768) {
      sidebarCheckbox.checked = true;
      localStorage.setItem('sidebarState', 'open');
    } else {
      sidebarCheckbox.checked = localStorage.getItem('sidebarState') === 'open';
    }

    // Инициализация активного меню
    const currentPath = window.location.pathname;
    const navGroups = document.querySelectorAll('.sidebar-nav-group');
    
    navGroups.forEach(group => {
      const toggle = group.querySelector('.sidebar-nav-toggle');
      const submenu = group.querySelector('.sidebar-submenu');
      const menuId = 'menu_' + toggle.textContent.trim().toLowerCase();
      
      // Проверка активной страницы
      const isActive = Array.from(submenu.querySelectorAll('a'))
        .some(link => link.getAttribute('href') === currentPath);
      
      if (isActive || localStorage.getItem(menuId) === 'open') {
        group.classList.add('active');
        submenu.style.display = 'block';
      }
      
      // Обработчик клика
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Закрытие других меню
        navGroups.forEach(g => {
          if (g !== group) {
            g.classList.remove('active');
            g.querySelector('.sidebar-submenu').style.display = 'none';
            localStorage.setItem('menu_' + g.querySelector('.sidebar-nav-toggle').textContent.trim().toLowerCase(), 'closed');
          }
        });
        
        // Переключение текущего меню
        group.classList.toggle('active');
        submenu.style.display = group.classList.contains('active') ? 'block' : 'none';
        localStorage.setItem(menuId, group.classList.contains('active') ? 'open' : 'closed');
      });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        sidebarCheckbox.checked = true;
        localStorage.setItem('sidebarState', 'open');
      } else {
        sidebarCheckbox.checked = localStorage.getItem('sidebarState') === 'open';
      }
    });
  });

  // Prevent default behavior for sidebar toggle
  document.querySelector('.sidebar-toggle').addEventListener('click', function(e) {
    e.preventDefault();
  });
})(document);
</script>