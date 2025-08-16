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