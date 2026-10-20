# `bool` - a weird history


Boolean expressions in C are a bit weird. Booleans were only added to the language fairly recently in C23, but that does not mean they haven't existed in the language. 

Before then, people would implement their own version of booleans, since booleans are essentially just a way to easily distinguish between a 1 or a 0 (imagine a switch being on/off).

Starting with C99 and up until C23, the `stdbool.h` header file has been the "correct" way of using a boolean:
```c
#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool a = false;
    printf("%d\n", a);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Here's what the `stdbool.h` file contains as per the specification:
```c
#if __STDC_VERSION__ < 202311l
#define bool _Bool
#define true 1
#define false 0
#endif

#define __bool_true_false_are_defined 1
```

Starting with C23 though, it is now an actual part of the language. In effect however, it is no different than just including the `stdbool.h` file:
```c
#include <stdio.h>

int main(void) {
    bool a = false;
    printf("%d\n", a);
    printf("Boolean value: %s\n", a ? "true" : "false");
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

> We will be using C11, so you have to include `stdbool.h` Most projects still don't use C23, and most projects use either C99 or C11, so we'll stick with that for this class.

There is still no format specifier for booleans, so we have to use the trick above to print out "true"/"false".


# Boolean Expressions

Boolean expressions follow a similar convention from our pseudocode, but now we use actual symbols. Here's a table that shows how they map $a$ and $b$ from our pseudocode to actual C code:

Operation | Pseudocode | C Code
| --- | --- | --- 
AND | $a$ and $b$ | $a$ && $b$
OR | $a$ or $b$ | $a$ \|\| $b$
NOT | not $a$ | !$a$

Here's what each one looks like in code:

```c
#include <stdio.h>

// Don't worry about understanding this yet
#define BOOL_TO_STR(b) b ? "true" : "false"
#define PRINT_OP(a, b, res, op) do {                \
    printf("{%s} {%s} {%s} = %s\n", BOOL_TO_STR(a), \
        op,                                         \
        BOOL_TO_STR(b),                             \
        BOOL_TO_STR(res));                          \
} while(0)

int main(void) {
    bool a = true;
    bool b = false;

    bool and = a && b;
    bool or = a || b;
    bool not = !a;

    PRINT_OP(a, b, and, "and");
    PRINT_OP(a, b, or, "or");
    printf("not {%s} = %s\n", BOOL_TO_STR(a), BOOL_TO_STR(not));
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

We also have comparison operators, like we might expect:

| Operation | C Code |
|-----------|--------|
| Greater Than | `a > b`
| Less Than | `a < b`
| Greater Than or Equal To | `a >= b`
| Less Than or Equal To | `a <= b`
| Equals | `a == b`

### Quick Warning

If your code has an error and you're using the "equals" operator, make sure you are not using assignment instead. The following code compiles, but is incorrect:
```c
#include <stdio.h>

int main() {
    int x = 5;
    int y = 10;

    // Bug: we are saying that "x is now the same value as y"
    bool sameValues = (x = y);
    // The result of (x = y) will be the value of y
    
    printf("same: %s\n", sameValues ? "yes" : "no");
    printf("x = %d | y = %d\n", x, y);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Naturally, we can nest as many boolean expressions as we want:

```c
#include <stdio.h>

int main(void) {
    bool superComplicatedResult =
        (
            !(
                (3 > 2)
                && !(7 < 4 || 5 == 5)
            )
            || (
                (10 == 10)
                && !(
                    !(1 < 0)
                    && (8 > 9 || 4 == 4)
                )
            )
        )
        && !((6 < 2) == (9 > 1))
        && false;
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

> If your code looks like this, *please* redo it and break it down into multiple variables. This kind of boolean expression is _only_ for demonstration, and should not be taken as an example of the ideal code.

# Operator Precedence

Like with arithmetic operators with PEMDAS, boolean expressions have their own operator precedence.

| Precedence  | Operation                                    | C Code                               |
|-------------|----------------------------------------------|--------------------------------------|
| 1 (highest) | NOT                                          | `!a`                                 |
| 2           | Greater Than, Less Than, and their `=` forms | `a > b`, `a < b`, `a >= b`, `a <= b` |
| 3           | Equals                                       | `a == b`                             |
| 4           | AND                                          | `a && b`                             |
| 5 (lowest)  | OR                                           | `a \|\| b`                           |

However, this should never be taken into consideration. Instead, you should make liberal use of parentheses to group expressions within a larger expression:

```c
#include <stdio.h>

int main(void) {
    int grade = 67;

    bool gradeIsBarelyFailing = (grade < 70) && (grade >= 60);
    
    printf("Grade is barely failing: %s\n", 
        gradeIsBarelyFailing ? "true" : "false");
}

```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

In this code, note how I didn't even have to consider operator precendence since I wrapped the two "sub-conditions" in parentheses. This is what I would consider acceptable code, since it is easier to read, especially when it gets more complex;
