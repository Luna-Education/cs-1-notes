// Light/dark theme toggle. Follows the system setting until the reader picks
// a theme, then remembers it. Load this in <head> (not deferred) so the theme
// applies before the page paints.
(function () {
  const STORAGE_KEY = 'theme';
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { }
  }

  function currentTheme() {
    return savedTheme() || (darkQuery.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('dark-theme').media = dark ? 'all' : 'not all';

    const button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = dark ? '☀️' : '🌙';
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    applyTheme(next);
  }

  applyTheme(currentTheme());

  darkQuery.addEventListener('change', function () {
    if (!savedTheme()) applyTheme(currentTheme());
  });

  // The button doesn't exist yet while <head> runs.
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    applyTheme(currentTheme());
  });
})();
