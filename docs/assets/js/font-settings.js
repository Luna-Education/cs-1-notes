// Font settings: a gear button (bottom left) that lets the reader pick the
// text and code fonts. Choices are remembered. Load this in <head> (not
// deferred) so a saved font applies before the page paints.
(function () {
  const STORAGE_KEY = 'fonts';

  // `href` is a stylesheet loaded only when the font is picked. Defaults have
  // none because index.html already loads them.
  const FONTS = {
    text: {
      label: 'Text font',
      cssVar: '--font-family',
      defaultId: 'lexend',
      options: [
        { id: 'lexend', name: 'Lexend', stack: '"Lexend", system-ui, sans-serif' },
        {
          id: 'atkinson',
          name: 'Atkinson Hyperlegible',
          stack: '"Atkinson Hyperlegible Next", system-ui, sans-serif',
          href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600;700&display=swap',
        },
        {
          id: 'opendyslexic',
          name: 'OpenDyslexic',
          stack: '"OpenDyslexic", system-ui, sans-serif',
          href: 'https://cdn.jsdelivr.net/npm/@fontsource/opendyslexic@5.3.0/index.css',
        },
        { id: 'system', name: 'System default', stack: 'system-ui, sans-serif' },
      ],
    },
    code: {
      label: 'Code font',
      cssVar: '--font-family-mono',
      defaultId: 'atkinson-mono',
      options: [
        {
          id: 'atkinson-mono',
          name: 'Atkinson Hyperlegible Mono',
          stack: '"Atkinson Hyperlegible Mono", ui-monospace, "Cascadia Code", Consolas, monospace',
        },
        {
          id: 'jetbrains-mono',
          name: 'JetBrains Mono',
          stack: '"JetBrains Mono", ui-monospace, "Cascadia Code", Consolas, monospace',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
        },
        {
          id: 'system',
          name: 'System default',
          stack: 'ui-monospace, "Cascadia Code", Consolas, monospace',
        },
      ],
    },
  };

  function savedFonts() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }

  function saveFonts(fonts) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fonts)); } catch (e) { }
  }

  function findOption(kind, id) {
    const group = FONTS[kind];
    return group.options.find((o) => o.id === id) ||
      group.options.find((o) => o.id === group.defaultId);
  }

  function loadStylesheet(href) {
    if (!href || document.querySelector('link[href="' + href + '"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function applyFont(kind, id) {
    const option = findOption(kind, id);
    loadStylesheet(option.href);
    document.documentElement.style.setProperty(FONTS[kind].cssVar, option.stack);
  }

  const saved = savedFonts();
  Object.keys(FONTS).forEach((kind) => applyFont(kind, saved[kind]));

  // ---------- Settings panel ----------

  function buildSelect(kind, panel) {
    const group = FONTS[kind];
    const id = 'font-select-' + kind;

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = group.label;

    const select = document.createElement('select');
    select.id = id;
    group.options.forEach((o) => select.add(new Option(o.name, o.id)));
    select.value = findOption(kind, savedFonts()[kind]).id;
    select.addEventListener('change', function () {
      const fonts = savedFonts();
      fonts[kind] = select.value;
      saveFonts(fonts);
      applyFont(kind, select.value);
    });

    panel.append(label, select);
  }

  function buildSettings() {
    const button = document.createElement('button');
    button.id = 'settings-toggle';
    button.type = 'button';
    button.textContent = '⚙️';
    button.title = 'Font settings';
    button.setAttribute('aria-label', 'Font settings');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'settings-panel');

    const panel = document.createElement('div');
    panel.id = 'settings-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Font settings');
    panel.hidden = true;
    Object.keys(FONTS).forEach((kind) => buildSelect(kind, panel));

    function setOpen(open) {
      panel.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('select').focus();
    }

    button.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !button.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        setOpen(false);
        button.focus();
      }
    });

    document.body.append(button, panel);
  }

  // <body> doesn't exist yet while <head> runs.
  document.addEventListener('DOMContentLoaded', buildSettings);
})();
