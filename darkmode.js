/* =========================================
   DARKMODE.JS - Theme Toggle
   ========================================= */

(function() {
  const STORAGE_KEY = 'tw-portfolio-theme';
  const html = document.documentElement;

  // Apply saved theme immediately (before DOMContentLoaded) to prevent flash
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-toggle');
    const icon = toggle?.querySelector('i');

    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Set initial icon
    const current = html.getAttribute('data-theme') || 'light';
    if (icon) icon.className = current === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    toggle?.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    // Respect system preference if no saved preference
    if (!saved) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.matches) setTheme('dark');
      mq.addEventListener('change', e => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  });
})();
