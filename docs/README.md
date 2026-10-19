# CS 1 Notes

Notes for an introductory computer science course, with code you can run right in the page.

## Try it

Every code block with a **Run** button is live. Click **Run** to execute it, or click into the code to change it first.

```c
#include <stdio.h>

int main(void) {
    printf("Hello, CS 1!\n");
    return 0;
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

```cpp
#include <iostream>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}
```
<codapi-snippet sandbox="cpp" editor="full"></codapi-snippet>

## Topics

### Fundamentals of C

- [If Statements](conditionals/if-statements.md)

## Using the code editor

| Action | Shortcut |
|---|---|
| Run the code | Click **Run**, or <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> |
| Undo | <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Z</kbd> |
| Redo | <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |
| Indent | <kbd>Tab</kbd> |
| Hide the output | <kbd>Esc</kbd> |

To start over, reload the page. Use the ☀️/🌙 button in the top-right corner to switch between light and dark mode.

Code runs in a sandbox with no internet access, and each run has a few seconds to finish.
