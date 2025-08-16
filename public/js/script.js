;(function (document) {
  var toggle = document.querySelector('.sidebar-toggle')
  var sidebar = document.querySelector('#sidebar')
  var checkbox = document.querySelector('#sidebar-checkbox')

  document.addEventListener('click', function (e) {
    var target = e.target

    // Toggle sidebar when clicking sidebar toggle or checkbox
    if (target === checkbox || target === toggle || target.closest('.sidebar-toggle')) {
      checkbox.checked = !checkbox.checked
      document.body.classList.toggle('sidebar-open', checkbox.checked)
      return
    }

    // Close sidebar when clicking outside
    if (!checkbox.checked || sidebar.contains(target)) return
    checkbox.checked = false
    document.body.classList.remove('sidebar-open')
  })

  // Sync checkbox state with body class
  checkbox.addEventListener('change', function () {
    document.body.classList.toggle('sidebar-open', this.checked)
  })
})(document)