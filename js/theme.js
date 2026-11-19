/* =====================================================
   CLOUDGAINZ — THEME TOGGLE
   Runs synchronously in <head> to prevent flash.
   Persists to localStorage["cg-theme"].
   ===================================================== */
(function () {
  const root = document.documentElement;

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    // Mark active button if toggle pill is already in the DOM
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b.dataset.themeSet === t);
        b.setAttribute('aria-pressed', b.dataset.themeSet === t ? 'true' : 'false');
      });
    }
    try { localStorage.setItem('cg-theme', t); } catch (e) { /* private browsing */ }
  }

  // Restore saved theme before first paint
  let saved = null;
  try { saved = localStorage.getItem('cg-theme'); } catch (e) {}
  setTheme(saved || 'dark');

  // Wire toggle pill once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Sync active state now that the DOM is available
    const current = root.getAttribute('data-theme') || 'light';
    toggle.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.themeSet === current);
    });

    toggle.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-theme-set]');
      if (btn) setTheme(btn.dataset.themeSet);
    });
  });
})();
