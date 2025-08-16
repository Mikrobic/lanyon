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
  document.querySelectorAll('.sidebar-nav-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var submenu = this.nextElementSibling;
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      this.classList.toggle('open');
    });
  });
})(document);
