# Pointers

When dealing with memory, we often need to tell our functions that something exists at a memory address. The way we do this is with **pointers**.


## Getting the memory address of a variable
The `&` operator is what tells us the memory address of a variable. If `T` is the type of the variable, the type the operator returns is `T*`. This is what it looks like to extract the memory address of an integer:

```c
int main() {
    int x = 10;

    int* x_memory_addr = &x;
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

However, it is important to note: often, we will **not** write the type as `int*`, but instead as `int *x_memory_addr`. This is the same to the compiler, however the industry standard is to think of a pointer type as a modification to the **variable** instead of the type itself.

This is because pointers are not a special type. On 32 bit systems, they are just integers, and `long` on 64 bit systems. However, C will allow us to say that something "points to" a type, so we don't need to worry about which type a pointer is besides remembering that it should be `T *var_name`.

## Reading the value at a memory address
So now we have the memory address of a value, so how do we get the value of a pointer? Luckily, the `*` is not just a part of the "type", but instead an operator itself, called the "dereference" operator.

```c
#include <stdio.h>

int main() {
    int x = 10;
    int *x_mem_addr = &x;
    x += 10;

    int y = *x_mem_addr;

    x += 10;

    printf("x = %d\n", x);
    printf("y = %d\n", y);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

Here, the biggest thing to note is that we copied the **value** itself, so it creates a "deep" copy.

If we use it in an expression that isn't assignment, it allows us to modify the value directly, as if we had a variable instead of a pointer:

```c
#include <stdio.h>

int main() {
    int source = 0;

    int *x = &source;
    int *y = &source;

    (*x) = (*x) + 5;
    printf("*x = %d\n", *x);
    printf("*y = %d\n", *y);

    (*y) = (*y) * 5;
    printf("*x = %d\n", *x);
    printf("*y = %d\n", *y);

    printf("source = %d\n", source);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>

> This code works if you leave out the parentheses, e.g., `*x = *x + 5;`, but I prefer to make my dereferencing obvious


# Using Pointers in Functions - Side Effects

Using a pointer allows us to engage in what are called "side-effects" - when we modify data within a function that does **not** belong to the function itself.

 Consider this:

```c
#include <stdio.h>

void func(int* value) {
    (*value)++;
}

int main() {
    int x = 0;
    func(&x);
    printf("x = %d", x);
}
```
<codapi-snippet sandbox="gcc" editor="full"></codapi-snippet>


