// Live syntax highlighting and undo/redo for editable Codapi snippets.
//
// Codapi strips Prism highlighting the first time a snippet is focused, so we
// re-highlight on every edit. Rewriting innerHTML wipes the browser's undo
// history, so we also keep our own per-snippet history.
(function () {
  const GROUP_MS = 800; // quick consecutive typing is one undo step

  function editableCode(target) {
    return target instanceof Element &&
      target.matches('pre[data-lang] > code[contenteditable="true"]') ? target : null;
  }

  // ---------- Caret helpers (offsets are in characters of textContent) ----------

  function textOffset(el, node, offset) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.setEnd(node, offset);
    return range.toString().length;
  }

  function caretOffset(el) {
    const sel = window.getSelection();
    if (!sel.rangeCount || !el.contains(sel.focusNode)) return null;
    return textOffset(el, sel.focusNode, sel.focusOffset);
  }

  function selectionOffsets(el) {
    const range = window.getSelection().getRangeAt(0);
    return {
      start: textOffset(el, range.startContainer, range.startOffset),
      end: textOffset(el, range.endContainer, range.endOffset),
    };
  }

  function setCaret(el, offset) {
    const sel = window.getSelection();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (offset <= node.length) {
        sel.collapse(node, offset);
        return;
      }
      offset -= node.length;
    }
    sel.selectAllChildren(el);
    sel.collapseToEnd();
  }

  // Where the caret belongs after `before` becomes `after`: the end of the
  // changed region, like most editors do on undo/redo.
  function changeEnd(before, after) {
    let suffix = 0;
    while (suffix < before.length && suffix < after.length &&
      before[before.length - 1 - suffix] === after[after.length - 1 - suffix]) suffix++;
    let prefix = 0;
    while (prefix < after.length - suffix && before[prefix] === after[prefix]) prefix++;
    return Math.max(prefix, after.length - suffix);
  }

  // ---------- Highlighting ----------

  function highlight(code) {
    const lang = code.parentElement.getAttribute('data-lang');
    const grammar = window.Prism && Prism.languages[lang];
    if (!grammar) return;
    const offset = caretOffset(code);
    code.innerHTML = Prism.highlight(code.textContent, grammar, lang);
    if (offset !== null) setCaret(code, offset);
  }

  function setText(code, text, caret) {
    code.textContent = text;
    highlight(code);
    setCaret(code, caret);
  }

  // ---------- Undo history ----------

  class History {
    constructor(text) {
      this.stack = [text];
      this.index = 0;
      this.lastTime = 0;
      this.lastType = '';
    }

    record(text, inputType) {
      if (text === this.stack[this.index]) return;
      const now = Date.now();
      const grouped = inputType === 'insertText' && this.lastType === 'insertText' &&
        now - this.lastTime < GROUP_MS && this.index > 0;
      this.stack.length = this.index + 1; // a new edit drops the redo states
      if (grouped) {
        this.stack[this.index] = text;
      } else {
        this.stack.push(text);
        this.index++;
      }
      this.lastTime = now;
      this.lastType = inputType;
    }

    // Move by `step` (-1 undo, +1 redo). Returns the text, or null at either end.
    move(step) {
      const target = this.index + step;
      if (target < 0 || target >= this.stack.length) return null;
      this.index = target;
      this.lastType = '';
      return this.stack[target];
    }
  }

  const histories = new WeakMap();

  function historyFor(code) {
    if (!histories.has(code)) histories.set(code, new History(code.textContent));
    return histories.get(code);
  }

  function record(code, inputType) {
    historyFor(code).record(code.textContent, inputType);
  }

  function undoRedo(code, step) {
    const before = code.textContent;
    const after = historyFor(code).move(step);
    if (after !== null) setText(code, after, changeEnd(before, after));
  }

  // ---------- Editing ----------

  // Insert Enter as a plain "\n" (browsers would add <br>/<div>, which
  // textContent drops). A trailing newline needs a second one to render.
  function insertNewline(code) {
    historyFor(code);
    const { start, end } = selectionOffsets(code);
    const text = code.textContent;
    const rest = text.slice(end);
    setText(code, text.slice(0, start) + '\n' + (rest === '' ? '\n' : rest), start + 1);
    record(code, 'insertParagraph');
  }

  // ---------- Event wiring ----------

  document.addEventListener('keydown', function (e) {
    const code = editableCode(e.target);
    if (!code) return;

    // Keep docsify's window-level shortcuts ("\" toggles the sidebar,
    // "/" focuses search) from firing while typing code. Docsify only
    // ignores keys typed in input/select/textarea, not contenteditable.
    e.stopPropagation();
    if (e.isComposing) return;

    const mod = e.metaKey || e.ctrlKey;
    const key = e.key.toLowerCase();
    let action = null;
    if (mod && key === 'z') action = () => undoRedo(code, e.shiftKey ? 1 : -1); // Cmd/Ctrl+Z, +Shift
    else if (e.ctrlKey && key === 'y') action = () => undoRedo(code, 1);        // Ctrl+Y
    else if (key === 'enter' && !mod && window.getSelection().rangeCount) action = () => insertNewline(code);

    if (action) {
      e.preventDefault();
      action();
    }
  });

  // Undo/Redo from the Edit menu or right-click menu.
  document.addEventListener('beforeinput', function (e) {
    const code = editableCode(e.target);
    if (!code) return;
    if (e.inputType === 'historyUndo' || e.inputType === 'historyRedo') {
      e.preventDefault();
      undoRedo(code, e.inputType === 'historyUndo' ? -1 : 1);
    } else {
      historyFor(code); // snapshot the pre-edit state on the first edit
    }
  });

  document.addEventListener('input', function (e) {
    const code = editableCode(e.target);
    if (!code || e.isComposing) return;
    highlight(code);
    record(code, e.inputType);
  });

  document.addEventListener('focusin', function (e) {
    const code = editableCode(e.target);
    if (!code) return;
    // Wait for Codapi's own focus handler to strip the highlighting first.
    setTimeout(function () {
      highlight(code);
      historyFor(code);
    }, 0);
  });
})();
