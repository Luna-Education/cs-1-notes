# If Statements

If statements in C are eerily similar to the pseudocode we used in the first six weeks. Also as if it was based somewhat on C.

The if statement allows a program to choose between two alternatives by testing the value of an expression. In its simplest form, the `if` statement has the form

```
if ( expression ) statement
```

The parenthesees around the expression are **mandatory**, as they are part of the language, not part of the expression. 

When an `if` statement is execute, the expression in the parentheses is evaluated. If the value of the expression is true (or non-zero, which is interpreted as true), the statement after the parentheses is executed:

```c
#include <stdio.h>

int main() {
    if(true)
        puts("This should print");

    if(1)
        puts("This should print, and I'm testing '1'");
    

    if(false)
        puts("This should not print");

    if(0)
        puts("This should not print, and I'm testing '0'");
        puts("This should print, even though it might not be immediately obvious");
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Note that the last `puts` statement runs, even though 0 evaluates to false. This is because the if statement only applies to the **next** statement, not anything after that.

Typically, we will usually write the boolean expression within the parentheses, and it won't be stored in a variable.

```c
#include <stdio.h>

int main() {
    int specialNumber = 0x15FF;

    if(specialNumber > 100) 
        puts("The special number is over 100");
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

# Compound Statements

Often, we want to write more than one line of code as our statement. In this case, we use curly braces to achieve this functionality:

```c
#include <stdio.h>

int main() {
    int specialNumber = 0xFFFF;

    if(specialNumber > 100) {
        puts("The special number is over 100");
        puts("and now I can have multiple statements in an if!");
    }

    return 0;
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

There is no limit to how long a compound statement can be.

While in some cases, you will be fine with a single statement, it is normally good practice to include the curly braces anyway. Often times, you may need to insert something later on, and it might introduce bugs.

# The `else` Clause

Typically, we will want to do something different as a fallback for when our if statement is false and doesn't execute the next statement.

An `if` statement may have an `else` clause:
```
if ( expression ) statement else statement
```

The statement that follows the word `else` is executed if the expression in the parentheses has the value of 0.

Consider the following example:

```c
#include <stdio.h>

int main() {
    int x = 10;
    int y = 20;

    int max;

    if(x > y) {
        max = x;
    } else {
        max = y;
    }

    printf("Max of %d and %d = %d\n", x, y, max);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Notice how the `else` keyword immediately follows the closing curly brace for the "true" statement. This is common convention, although having the following is technically not wrong:
```c
if(x > y) {
    max = x;
} 
else {
    max = y;
}
```

and the following convention is used by C#:

```csharp
if (x > y)
{
    max = x;
} 
else
{
    max = y;
}
```

How you format `if-else` statements is ultimately up to you, just don't be too avant-garde with it to where it becomes a detriment of the readability of your code.


# Nested `if` Statements

There are no restrictions on what kind of statement can go inside an `if` statement, and that includes *other* `if` statements. Nesting `if` statements is very common.

For example, this program finds the largest of three numbers `i`, `j`, and `k`:

```c
#include <stdio.h>

int main() {
    int i = 4;
    int j = 9;
    int k = 7;

    int max;

    if(i > j)
        if(i > k)
            max = i;
        else
            max = k;
    else
        if(j > k)
            max = j;
        else
            max = k;

    printf("Max of %d, %d, and %d = %d\n", i, j, k, max);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

`if` statements can be nested as deeply as you want. Notice how lining up each `else` with the `if` it belongs to makes the nesting easier to follow.

If the nesting is still confusing, add braces. Adding braces when they aren't required is a lot like adding parentheses to a boolean expression: it makes the code easier to read, and it guarantees the compiler understands the code the same way you do.

Following the advice from the Compound Statements section, the same code with braces on every `if` and `else` looks like this:

```c
#include <stdio.h>

int main() {
    int i = 4;
    int j = 9;
    int k = 7;

    int max;

    if(i > j) {
        if(i > k) {
            max = i;
        } else {
            max = k;
        }
    } else {
        if(j > k) {
            max = j;
        } else {
            max = k;
        }
    }

    printf("Max of %d, %d, and %d = %d\n", i, j, k, max);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Using braces everywhere has two advantages:

1. The code is easier to change later, since you can add more statements to any `if` or `else` without restructuring anything.
2. It prevents the bug where you add a second statement to an `if` or `else`, forget the braces, and the new line ends up running every time (like the last `puts` in the very first example).

# Cascaded `if` Statements

Often, we need to test a series of conditions and stop as soon as one of them is true. A "cascaded" `if` statement is usually the best way to write this.

For example, here's how we could check whether `n` is less than, equal to, or greater than 0 using what we already know:

```c
#include <stdio.h>

int main() {
    int n = 0;

    if(n < 0)
        puts("n is less than 0");
    else
        if(n == 0)
            puts("n is equal to 0");
        else
            puts("n is greater than 0");
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Even though the second `if` is technically nested inside the first one's `else`, C programmers don't usually indent it. Instead, each `else` is lined up with the original `if`:

```c
#include <stdio.h>

int main() {
    int n = 0;

    if(n < 0) {
        puts("n is less than 0");
    } else if(n == 0) {
        puts("n is equal to 0");
    } else {
        puts("n is greater than 0");
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

This gives cascaded `if` statements their recognizable shape:

```
if ( expression )
    statement
else if ( expression )
    statement
...
else if ( expression )
    statement
else
    statement
```

The final `else` is optional, so leave it out if there's nothing to do when none of the conditions are true.

Writing it this way keeps the code from drifting further and further to the right when there are lots of conditions to test, and it makes clear to anyone reading it that this is just a series of tests.

Keep in mind that a cascaded `if` isn't a new kind of statement. `else if` is not a special keyword: it's just an ordinary `if` statement whose `else` clause happens to be another `if` statement (whose `else` clause might be another `if` statement, and so on).
