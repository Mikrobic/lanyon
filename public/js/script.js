document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('sidebar-checkbox');
  const toggle = document.querySelector('.sidebar-toggle');
  
  // Toggle sidebar on button click
  if (toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
    });
  }

  // Close sidebar when clicking outside
  document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    if (!checkbox.checked || 
        e.target === toggle || 
        (sidebar && sidebar.contains(e.target))) {
      return;
    }
    checkbox.checked = false;
  });
});