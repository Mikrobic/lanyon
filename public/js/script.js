(function(document) {
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
})(document);
