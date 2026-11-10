# Do-While Loops

`do-while` loops are a natural extension of the `while` loop.

The "template" for a do-while loop is as follows:

```
do  <STATEMENT>
while(<BOOLEAN_EXPRESSION>);
```

```c
#include <stdio.h>

int main() {
    int x = 10;
    do {
        printf("%d\n", x);
        x--;
    } while(x > 0);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>


The main feature of a do-while loop is that it guarantees **that we run the statement at least once**.

<!-- TODO: Create a trace table for a loop -->

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    srand(time(NULL));
    int x;
    int tries = 0;
    do {
        x = rand();
        tries++;        
    } while(x % 2 != 0);

    printf("x was even after %d tries: x = %d\n", tries, x);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

## Examples

### Computing Fibonacci Numbers
```c
#include <stdio.h>
int main() {
    int n = 10; // want to compute f_n, n >= 1
    int original_n = n;

    int f_curr = 1, f_prev = 0; // know f_1 and f_0 by definition

    do {
        int f_next = f_curr + f_prev;
        n--;
        
        f_prev = f_curr;
        f_curr = f_next;

        // Since we already computed the first two, stop when n >= 2
        //      instead of n >= 0
    } while(n >= 2);

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
    do {
        factorial *= n;
    } while(n > 0);

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

    // since we run the loop at least once,
    //  we now have to check if we even have a list to work with
    if(n == 0) {
        puts("Empty List");
        return 0; // not an error if we have an empty list
    }

    int i = 0;
    do {
        printf("%d ", values[i]);
        i++;
    } while(i < n);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>
