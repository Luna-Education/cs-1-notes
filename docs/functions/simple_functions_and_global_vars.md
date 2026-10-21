# Global Variables

Global variables are variables that are available everywhere, and defined outside of a function, typically at the start of the file:

```c
#include <stdio.h>

int some_global_variable = 1;

int main() {
    printf("%d\n", some_global_variable);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Changes to global variables affect it everywhere. In many languages, this would be considered a bad practice to do. This is similarly true for us as well, but there may be instances in which it is desired (especially when making games). 

If we only have the `main` function, global variables don't make much sense. Instead, let's begin defining our own functions to break our code down.

## Function Definitions

Functions are defined as
```
<return-type> <function_name>() {
    statement 1;
    statement 2;
    ...
    return <value>;
}
```

Let's look at the definition of our `main` function:
```c
int main() {
    return 0;
}
```

Here, we have the "return type" of `int`. This means that we need to return an integer. While we can omit the return from `main`, any other function **must** return a value. We also have the function name `main`, which we have become familiar with.

While we can have many statements, this `main` function only has a single statement: `return 0;`. 

### Return Types

We can return any valid C type from a function. However, we can only ever return a *single* value. We will eventually learn how to get around this, but now is not the time.

However, we might *not* want to return a value. In this case, we would use the `void` keyword.

Here are instances in which we would want to use the `void` keyword:
- A function that prints data
- A function that modifies global variables
- A function that initializes something (e.g., tests if a file exists and creates it if it doesn't exist)
- A function that modifies a variable through a pointer (we will go over this later on)

Here are some examples of functions:
```c
#include <stdio.h>

int global_x;

int a;
int b;

void print_global_x() {
    printf("Global X: %d\n", global_x);
}

void initialize_global_x() {
    global_x = 5;
}

double get_pi() {
    return 3.14159;
}

int max(int a, int b) {
    if(a > b) {
        return a;
    } else {
        // Despite being in an if statement,
        // because we always either run
        //     `return a;` or `return b;`
        // we meet the requirement for having a return statement
        return b;
    }
}

int main() {
    a = 10;
    b = 5;
    int M = max(a, b);

    printf("Max of %d and %d = %d\n", a, b, M);

    initialize_global_x();
    print_global_x();

    double pi = get_pi();
    printf("pi = %f\n", pi);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

and here is a summary of their "anatomy"

| Name                  | Return Type | Return Statement                      |
|-----------------------|-------------|---------------------------------------|
| `print_global_x`      | `void`      | None                                  |
| `initialize_global_x` | `void`      | None                                  |
| `get_pi`              | `double`    | `return 3.14159;`                     |
| `max`                 | `int`       | `return a;` or `return b;`            |
| `main`                | `int`       | None (omitted, so `main` returns `0`) |

