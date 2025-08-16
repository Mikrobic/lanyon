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

  const toggleButtons = document.querySelectorAll('.sidebar-nav-toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      const isOpen = submenu.style.display === 'block';
      
      submenu.style.display = isOpen ? 'none' : 'block';
      this.classList.toggle('open', !isOpen);
    });
  });
})(document);
