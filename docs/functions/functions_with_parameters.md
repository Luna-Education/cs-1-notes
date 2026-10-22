# Parameters

While global variables could be useful sometimes, we generally want functions to have a self-contained behavior to them, 
meaning they act as you handing off a job to someone else.

Ideally, the exchange within your code should be, "here's some data, please give me this value back". Let's look at this example, where we create a function to compute the average of three numbers:

```c
#include <stdio.h>

double average3(double x, double y, double z) {
    return (x + y + z) / 3;
}

int main() {
    double a3 = average3(10, 11, 13);
    printf("%0.2f\n", a3);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Here, our **parameters** are `x`, `y`, and `z`, all of the `double` type. Notice how they are separated by commas. 

In C, we may often want to have variations of functions that accept slightly different things to get the same result.

Consider these two max functions, with one taking the max of two values and another that takes the max of three values:

```c
#include <stdio.h>

int max(int a, int b) {
    if(a > b) return a;
    
    return b;
}

int max(int a, int b, int c) {
    int swap_temp;
    if(a > b) {
        swap_temp = b;
        b = a;
        a = swap_temp;
    }

    if(b > c) {
        swap_temp = c;
        c = b;
        b = swap_temp;
    }

    return c;
}

int main() {
    int m2 = max(6, 7);
    int m3 = max(9, 8, 7);

    printf("max(6,7) = %d\n", m2);
    printf("max(9, 8, 7) = %d\n", m3);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

If we run this code, the first error we get is

```
main.c:9:5: error: conflicting types for 'max'; have 'int(int,  int,  int)'
    9 | int max(int a, int b, int c) {
      |     ^~~
main.c:3:5: note: previous definition of 'max' with type 'int(int,  int)'
    3 | int max(int a, int b) {
```

In other languages (like Java), this would be valid code, since the input (2 `int`s vs 3 `int`s) can also be used to distinguish between the functions. However, in C, **functions cannot be overloaded** 

> overloaded - same name and result, but different input

Instead, we just have to give them different names:

```c
#include <stdio.h>

int max2(int a, int b) {
    if(a > b) return a;
    
    return b;
}

int max3(int a, int b, int c) {
    int swap_temp;
    if(a > b) {
        swap_temp = b;
        b = a;
        a = swap_temp;
    }

    if(b > c) {
        swap_temp = c;
        c = b;
        b = swap_temp;
    }

    return c;
}

int main() {
    int m2 = max2(6, 7);
    int m3 = max3(9, 8, 7);

    printf("max(6,7) = %d\n", m2);
    printf("max(9, 8, 7) = %d\n", m3);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

## Variable Parameters

So far, we have only passed "literal" values into functions (explicit values). We can also pass in variables:

```c
#include <stdio.h>

void increment_and_print(int x) {
    printf("%d\n", x + 1);
}

int main() {
    int some_number = 66;
    increment_and_print(some_number);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

It should be noted that function parameters in C follow the "pass-by-value" specification:

> Pass-by-value: We provide a **copy** of the variable's value. The original variable is unaffected.

Let's look at how this works in practice:

```c
#include <stdio.h>

void add_one(int x) {
    x = x + 1;

    printf("Result of add_one: %d\n", x);
}

int add_one_return(int x) {
    x = x + 1;
    printf("Result of add_one_return: %d\n", x);
    return x;
}

int main() {
    int z = 66;
    add_one(z);
    add_one_return(z);
    z = add_one_return(z);
    printf("Result at end of program: %d\n", z);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Here's what happens with our values:

```
z = 66
call add_one(z)
    make a copy of z and store it in x (x = 66)
    add one to x (x = 67)
    print x => "67"

call add_one_return(z)
    make a copy of z and store it in x (x = 66)
    add one to x (x = 67)
    print x => "67"
    return x

z = call add_one_return(z)
        make a copy of z and store it in x (x = 66)
        add one to x (x = 67)
        print x => "67"
        return x
    add_one_return(z) returns 67 (z = 67)

print z => "67"
```

Note that at any point, we can never _directly_ modify the value of `z`. 


### Extra Content (for now) - Pointers

> The following content is for completion, and is not something we'll go over until either December or January

The one exception is by passing a memory address as the paramter:

```c
#include <stdio.h>

void evil_function(int *value) {
    printf("modifying memory address: 0x%x\n", value);
    *value = *value / 2;
    puts("done modifying.");
}

int main() {
    int x = 1234;
    printf("The memory address of x is 0x%x\n", &x);
    evil_function(&x);
    printf("x = %d\n", x);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>


So, we have modified the value of `x` from a function. This is called a **side-effect**. We have also not violated pass-by-value, since the value we passed in was the _memory address_ of the value.

This technique is actually how complex data is typically passed around in C applications, since it is much faster to copy a 64-bit memory address than it is to, for example, copy a 12 MB of image data.