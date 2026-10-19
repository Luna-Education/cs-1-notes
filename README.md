# CS 1 Notes

Notes for an introductory computer science course, built with [Docsify](https://docsify.js.org). Code examples run in the browser through a self-hosted [Codapi](https://codapi.org) server at `https://codapi.lunaghs.dev`.

## Run locally

```sh
npm install
npm run docs
```

Then open the URL it prints (port 3000 by default, or a free port if 3000 is taken).

## Project layout

```
docs/
  index.html          Docsify config and script/style includes
  README.md           Home page
  _sidebar.md         Sidebar navigation
  assets/css/custom.css   Site styles (code colors, Codapi widgets, theme toggle)
  assets/js/theme.js      Light/dark theme toggle
  assets/js/editor.js     Live highlighting and undo/redo in editable snippets
  <topic>/<page>.md   Note pages, e.g. conditionals/if-statements.md
```

## Adding a page

1. Create a Markdown file under `docs/`, e.g. `docs/loops/for-loops.md`.
2. Link it in `docs/_sidebar.md` and in the Topics list in `docs/README.md`.

## Runnable code

Put a `<codapi-snippet>` right after a fenced code block:

````md
```c
#include <stdio.h>

int main(void) {
    puts("hi");
    return 0;
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>
````

Sandboxes available on the server:

| Language | Code block tag | `sandbox=` |
|---|---|---|
| C | `c` | `gcc` |
| C++ | `cpp` | `cpp` |

Syntax highlighting for C and C++ is loaded in `docs/index.html`. To add another language, add its Prism component there.
