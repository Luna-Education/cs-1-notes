# Console I/O

**Table of Contents:**

- [`puts`](/input-output/console-io?id=puts)
- [`printf`](/input-output/console-io?id=printf)
  - [Format Specifiers](/input-output/console-io?id=format-specifiers)
  - [Escape Sequences](/input-output/console-io?id=escape-sequences)
- [`scanf`](/input-output/console-io?id=scanf)

All three of these functions come from `stdio.h` ("standard input/output"), so every program here starts with `#include <stdio.h>`.

# `puts`

`puts` prints a string and then a newline. It is the simplest way to print text.

```c
#include <stdio.h>

int main() {
    puts("Hello, world!");
    puts("This is on a new line.");
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

`puts` can only print strings. If we want to print numbers or variables, we need `printf`.

# `printf`

`printf` ("print formatted") prints text, and lets us insert values into that text using **format specifiers**. Unlike `puts`, it does **not** add a newline for us.

```c
#include <stdio.h>

int main() {
    int age = 19;
    double gpa = 3.75;

    printf("I am %d years old.\n", age);
    printf("My GPA is %f\n", gpa);
    printf("Age: %d, GPA: %.2f\n", age, gpa);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Each format specifier is replaced, in order, by the values after the string.

## Format Specifiers

| Specifier | Type             | Example                           |
|-----------|------------------|-----------------------------------|
| `%d`      | `int`            | `printf("%d", 42);`               |
| `%f`      | `double`/`float` | `printf("%f", 3.14);`             |
| `%.2f`    | `double`/`float` | `printf("%.2f", 3.14159);` → 3.14 |
| `%c`      | `char`           | `printf("%c", 'A');`              |
| `%s`      | string           | `printf("%s", "hi");`             |
| `%%`      | a literal `%`    | `printf("100%%");`                |

## Escape Sequences

| Sequence | Meaning      |
|----------|--------------|
| `\n`     | New line     |
| `\t`     | Tab          |
| `\\`     | Backslash    |
| `\"`     | Double quote |

# `scanf`

`scanf` ("scan formatted") reads input from the user. It uses the same format specifiers as `printf`, but we put an `&` before the variable name so `scanf` knows *where* to store the value (we will go over what `&` means when we cover pointers).

```c
#include <stdio.h>

int main() {
    int age;
    double height;

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Enter your height in meters: ");
    scanf("%lf", &height);

    printf("You are %d years old and %.2f meters tall.\n", age, height);
}
```

> [!NOTE]
> The in-page editor can't take keyboard input, so compile and run this one on your own machine.

> [!WARNING]
> When reading a `double` with `scanf`, use `%lf`, not `%f`. (`printf` accepts `%f` for both `float` and `double`.)
