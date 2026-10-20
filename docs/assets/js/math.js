// KaTeX math for Docsify: $inline$ and $$display$$.
//
// Math is rendered before the Markdown parser runs, so characters like _ and \
// inside formulas aren't turned into emphasis or escapes. Fenced code blocks
// and inline code are left untouched. Write \$ for a literal dollar sign.
(function () {
  // Fenced code, inline code, display math, inline math (in that priority).
  const TOKEN = /(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2[ \t]*(?=\n|$)|`+[^`]*?`+|\\\$|\$\$([\s\S]+?)\$\$|\$([^\s$](?:[^$\n]*?[^\s$])?)\$/g;

  function render(tex, displayMode) {
    try {
      return katex.renderToString(tex, { displayMode, throwOnError: false });
    } catch (e) {
      return tex;
    }
  }

  function renderMath(markdown) {
    return markdown.replace(TOKEN, (match, _lead, _fence, display, inline) => {
      if (match === '\\$') return '&#36;';
      if (display !== undefined) return '\n\n' + render(display.trim(), true) + '\n\n';
      if (inline !== undefined) return render(inline, false);
      return match; // code: leave as-is
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    hook.beforeEach(renderMath);
  });
})();
