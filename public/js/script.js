(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');
  var sidebarCheckbox = document.getElementById('sidebar-checkbox');

  // Обработчик клика по гамбургеру
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Переключаем состояние чекбокса
    checkbox.checked = !checkbox.checked;
    
    // Для мобильных устройств всегда закрываем сайдбар после переключения
    if (window.innerWidth <= 768) {
      checkbox.checked = false;
    }
  });

  // Обработчик кликов по документу (закрытие при клике вне сайдбара)
  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);

  // Функция проверки мобильного устройства
  function checkMobile() {
    if (window.innerWidth <= 768) {
      document.body.classList.add('mobile-view');
      // Закрываем сайдбар по умолчанию на мобильных
      sidebarCheckbox.checked = false;
    } else {
      document.body.classList.remove('mobile-view');
    }
  }

  // Проверяем при загрузке и при изменении размера окна
  window.addEventListener('load', checkMobile);
  window.addEventListener('resize', checkMobile);
  
  // Сохранение состояния сайдбара
  if (localStorage.getItem('sidebarState') === 'open') {
    checkbox.checked = true;
  }

  checkbox.addEventListener('change', function() {
    localStorage.setItem('sidebarState', this.checked ? 'open' : 'closed');
  });

})(document);