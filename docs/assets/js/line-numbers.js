// Line numbers for every fenced code block.
//
// The numbers live in a gutter next to <code>, not inside it, so they can't be
// selected, copied, or sent to Codapi with the program. Editable snippets
// recount whenever their text changes (typing, undo, Codapi's reset).
(function () {
  function lineCount(code) {
    const text = code.textContent;
    const lines = text.split('\n').length;
    // A trailing newline doesn't start a visible line of its own.
    return text.endsWith('\n') && lines > 1 ? lines - 1 : lines;
  }

  function render(gutter, code) {
    const count = lineCount(code);
    if (gutter.childElementCount === count) return;
    const numbers = [];
    for (let i = 1; i <= count; i++) numbers.push('<span>' + i + '</span>');
    gutter.innerHTML = numbers.join('');
  }

  function addLineNumbers(pre) {
    const code = pre.querySelector(':scope > code');
    if (!code || pre.querySelector(':scope > .line-numbers')) return;
    const gutter = document.createElement('span');
    gutter.className = 'line-numbers';
    gutter.setAttribute('aria-hidden', 'true');
    pre.insertBefore(gutter, code);
    pre.classList.add('has-line-numbers');
    render(gutter, code);
    new MutationObserver(function () {
      render(gutter, code);
    }).observe(code, { childList: true, subtree: true, characterData: true });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    hook.doneEach(function () {
      document.querySelectorAll('.markdown-section pre[data-lang]').forEach(addLineNumbers);
    });
  });
})();
