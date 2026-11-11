# For Loops

For loops are the most common type of loop. Here is how they are structured:

```
for(<INITIALIZE_STATEMENT>; <CONDITION>; <UPDATE>)
    <STATEMENT or BLOCK_STATEMENT>
```

If I wanted to print the values from 0 to 10, I could write this code:

```c
#include <stdio.h>

int main() {
    for(int i = 0; i <= 10; i++) {
        printf("%d\n", i);
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

The for statement has the execution flow of:

1) Run the Intialization Statement
2) Run the Condition. If it is true, continue to (3). If it is false, end execution of the for loop and continue to then next line of code.
3) Run the Statement (or Block Statement)
4) Run the Update Statement and return to (2)

## Intializer and Condition

The initialization statement is intended for you to create a new variable that acts as the "control" variable in the condition. However, it can be blank, and it could also be separated by commas (if they're the same type) to have many different variables.


```c
#include <stdio.h>

int main() {
    for(int i = 0, j = 5; i < j; i++) {
        printf("(i,j) = (%d, %d)\n", i, j);
    }
    puts("Done.");
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

One thing to note is that the variables created in the Initialization are **scoped** to the for loop itself.

This code will fail:
```c
#include <stdio.h>

int main() {
    for(int i = 0; i < 10; i++) {
        printf("%d\n", i);
    }

    // `i` no longer exists:
    printf("Ending value of i: %d", i);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

## Translating the Examples from the While and Do-While Notes

Each example below is the `for` version of an example from [While Loops](./while-loops.md) or [Do-While Loops](./do-while.md).

### Countdown (from while)

If the control variable must still exist after the loop, declare it before the `for` instead of in the initializer (see the scoping note above):

```c
#include <stdio.h>

int main(void) {
    int x;
    for(x = 5; x > 0; x--) {
        printf("x is still not below 0: x = %d\n", x);
    }

    printf("x should now be 0: x = %d\n", x);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

### Countdown (from do-while)

```c
#include <stdio.h>

int main() {
    for(int x = 10; x > 0; x--) {
        printf("%d\n", x);
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

### Assignment in the condition (from while)

The `for` loop has an empty initializer and update, so the assignment goes in the condition:

```c
#include <stdio.h>

int main(){
    FILE file;
    start_reading_directory("C:\\Users\\Student\\Downloads");
    for(; (file = get_next_file()) != NULL; ) {
        printf("Reading: %s\n", file.file_name);
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

The pre-read version fits a `for` loop even better, because the first read goes in the initializer and the next read goes in the update:

```c
#include <stdio.h>

int main(){
    FILE file;
    start_reading_directory("C:\\Users\\Student\\Downloads");
    for(file = get_next_file(); file != NULL; file = get_next_file()) {
        printf("Reading: %s\n", file.file_name);
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

### Computing Fibonacci Numbers (from while and do-while)

The `while` and `do-while` versions both run the body 9 times for `n = 10`, so one `for` loop covers both. The decrement of `n` moves into the update:

```c
#include <stdio.h>
int main() {
    int n = 10; // want to compute f_n, n >= 1
    int original_n = n;

    int f_curr = 1, f_prev = 0; // know f_1 and f_0 by definition

    // Since we already computed the first two, stop when n >= 2
    //      instead of n >= 0
    for(; n >= 2; n--) {
        int f_next = f_curr + f_prev;

        // move up current and previous
        f_prev = f_curr;
        f_curr = f_next;
    }

    printf("%dth fibonacci number: %d\n", original_n, f_curr);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

### Computing Factorial (from while and do-while)

```c
#include <stdio.h>
int main() {
    int n = 5;
    int factorial = 1;
    for(; n > 0; n--) {
        factorial = factorial * n;
    }

    printf("%d\n", factorial);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

The do-while version of this example in [Do-While Loops](./do-while.md) never decrements `n`, so its condition `n > 0` never becomes false and the loop never ends. The `for` version above does not have that problem, because `n--` is in the update.

### Iterating through an array (from while and do-while)

Filling the array with `fill_rand` and then printing it:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void fill_rand(int *arr, int n) {
    srand(time(NULL));
    for(int i = 0; i < n; i++) {
        arr[i] = rand() % 100;
    }
}

int main() {
    int n = 10;
    int values[n];
    fill_rand(values, n);

    for(int i = 0; i < n; i++) {
        printf("%d ", values[i]);
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Unlike the do-while version, this needs no `if(n == 0)` check. When `n` is 0 the condition is false on the first check and the loop body never runs.

### Random number until even (from do-while)

A `for` loop checks its condition before the first run, so the do-while guarantee of running at least once has to be set up another way. Here `x` starts as an odd number, which makes the first check pass:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    srand(time(NULL));
    int x = 1; // odd, so the loop body runs at least once
    int tries;
    for(tries = 0; x % 2 != 0; tries++) {
        x = rand();
    }

    printf("x was even after %d tries: x = %d\n", tries, x);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

