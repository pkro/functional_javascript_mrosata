First module of the functional programming course by Michael Rosata

**Pure functions**

impure (change values outside function or change argument variable):

    const people = ['a','b','c']
    let lives = 3;

    function playerLostImpure() {
      lives--;
    }

    function addPersonImpure(name) {
      people.push(name);
    }


Pure:

    const people = ['a','b','c']
    let lives = 3;

    function playerLost(lives) {
      return lives-1;
    }

    function addPerson(list, ...name) {
      // return people.concat(name); // concat returns a new array
      // return people.slice().push(name); // also fine as slice creates a new array
      // concat will take many arguments and will unwrap single depth arrays
      // return [].concat(...list, [1,2,3], 3123, name)
      // same as ES6
      // return [...list, [1,2,3], 3123, name]
    }

    ES6 spread with variable number of items

        function addPerson(list, ...name) {
          return [...list, ...name];
        }


**Javascript mutators:**

    copyWithin
    fill
    pop
    push
    reverse
    shift
    unshift
    splice
    sort

**IO is always impure (console.log, modifying DOM etc.)**

**Referential transparency**

Pure functions always produce the same output when passed the same input

    const add = (a,b) => a + b;
    add(1, 2)  // always 3
    add(2, 1)  // always 3, same output for different sets of inputs is fine
    add(10, 1)  // always 11
    add('Hello ', 'World)  // always "Hello World"


**Thinking of functions in term of their return values**

-> code: see 1_functions_in_terms_of_return_values.js

 **How to Identify and Encapsulate Impurities in Java Script**
 
 One impure function breaks referential transparency of all functions that rely on it.

-> solution: isolate impure function

Example of isolating an impure function by returning an impure function from a pure function see code 3_Ho_to_identify[...].js

**Higher order functions:** take other functions as input and / or return a function

**Closures**

- functions returned from a function inherit the variable scope in which they were defined in
- Global scope
- when a function runs, a new temporary scope is created for the function that contains the global and its own variable scope
- when it finishes running, its scope is destroyed / garbage collected
- when a function is returned from a function, the returned function is (and must be) kept alive

      Global scope {
        scope: var a=20, b=12, function higherOrder, var c = higherOrder

        function higherOrder() {
          scope: var d=30, global scope a,b, return function inner

          function inner() {
            scope: var e="candle in the wind", global scope a,b, closure scope d
            **as long as there's a reference to the returned inner function, the scope is not destroyed**
          }
        }
      }

**Replacing loops with higher order functions**

- nothing new here, just 2 recursive every / some function

**Reasoning with reduce**

- map & filter can be done with just reduce (see code)
- that video was confusing and most likely missing something or out of order

**A better way to map and filter**

Takeaways: 
- assigning a value to a nonexisting index in an array doesn't update the length property like .push does
- forEach is impure as it doesn't return anything
- dynamically create a new object of same type of input object: const output = new list.constructor();


**Rendering UI Components with Higher Order Functions**
- document.createDocumentFragment creates a DOM fragment without putting it in the DOM right away
