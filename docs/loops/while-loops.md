# While Loops

While loops are a form of looping mechanism, which repeats a section of code until some condition is met.
It has the form

```text
while(<condition>)
    <statement>
```

The process that a while loop executes is the following:

1. Execute the condition
2. If the condition is false, skip the statement and continue
3. If the condition is true, execute the statement and return to step 1

Like with `if` statements, the `<statement>` part can mean either a single line of code, or a block.


In this example, I decrease x by one while it is greater than zero:

```c
#include <stdio.h>

int main(void) {
    int x = 5;
    while(x > 0) {
        printf("x is still not below 0: x = %d\n", x);
        x = x - 1;
    }

    printf("x should now be 0: x = %d\n", x);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Note that instead of storing the result of `x > 0` in a variable, we directly use the expression. 
Typically, you should't really just have a boolean variable as the condition. 
However, one kind of odd thing we can do is to use "assignment" as an expression. 
Consider the following code:
```c
#include <stdio.h>

int main() {
    int x;
    int y = (x = 10);
    printf("%d\n", y);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Here, $y$ has a value of 10. This is because the statement `(x = 10)` returns the assigned value, which is 10 in this case.
We can use this to check when a value is updated to be a certain value.

Imagine that we have a function `get_next_file` that returns the next file in a directory, returning `NULL` when there are no more files.
We could write a while-loop to go through each file:
```c
#include <stdio.h>

int main(){
    FILE file;
    start_reading_directory("C:\\Users\\Student\\Downloads");
    while( (file = get_next_file()) != NULL ) {
        printf("Reading: %s\n", file.file_name);
    }
}
```

Of course, this is entirely optional. Instead, we could write our code to not use this convention:

```c
#include <stdio.h>

int main(){
    FILE file;
    start_reading_directory("C:\\Users\\Student\\Downloads");
    // NOTE: we now need to read the first one before starting the loop, 
    //       since otherwise it is guaranteed to be NULL
    file = get_next_file(); 
    while( file != NULL) {
        printf("Reading: %s\n", file.file_name);
        file = get_next_file();
    }
}
```


## Examples

### Computing Fibonacci Numbers
```c
#include <stdio.h>
int main() {
    int n = 10; // want to compute f_n, n >= 1
    int original_n = n;

    int f_curr = 1, f_prev = 0; // know f_1 and f_0 by definition

    int f_next;

    // Since we already computed the first two, stop when n >= 2
    //      instead of n >= 0
    while(n >= 2) {
        f_next = f_curr + f_prev;
        n--;
        
        // move up current and previous
        f_prev = f_curr;
        f_curr = f_next;
    }

    printf("%dth fibonacci number: %d\n", original_n, f_curr);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

### Computing Factorial
```c
#include <stdio.h>
int main() {
    int n = 5;
    int factorial = 1;
    while(n > 0) {
        factorial = factorial * n;
        n--; // n = n - 1
    }

    printf("%d\n", factorial);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

### Iterating through an array
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void fill_rand(int *arr, int n) {
    int i = 0;
    srand(time(NULL));
    while(i < n) {
        arr[i] = rand() % 100;
        i++;
    }
}

int main() {
    int n = 10;
    int values[n];
    fill_rand(values, n);

    int i = 0;
    while(i < n) {
        printf("%d ", values[i]);
        i++;
    }
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>