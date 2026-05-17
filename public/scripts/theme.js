// Ketoy — theme toggle (light by default, dark via localStorage).
// The inline boot script in each page's <head> applies the theme before
// first paint; this file just wires the button click and persists.
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('ketoy-theme', 'light'); } catch (e) {}
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('ketoy-theme', 'dark'); } catch (e) {}
    }
  });
})();
