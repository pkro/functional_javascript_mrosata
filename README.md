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

**What Partial Application and Curry Mean**

- arity: number of parameters a function takes
- === fn.length property
- predefined parameters don't count for length:
  
      function totalApp(a1, a2, extra = '3') {console.log(totalApp.length)} // 2
- arity of 1 (1 argument): unary, arity of 2: binary, 3: ternary, 0 = nullary, more than 1: polyaric
- total application (total function is applied even when arguments are missing)
- partial application: function is not run until all arguments are present; if less arguments, parameters are bound to their variabels and returns a function with the remaining missing arguments (execution is deferred until all arguments are present)
  
      // NOT working in vanilla JS
      // also wrong in video (console.log instead of return)
      function partialApp(a1, a2, a3) {
        return `booom ${a1+a2+a3}`;
      }

      const part1 = partialApp(100) // binds a1 = 100 and returns a binary function
      const part2 = part1(20) // binds a2 = 20 and returns a unary function
      const part3 = part2(30) // binds a3 = 30 and total application, part3 = "boom 60"
      log(part3) // "boom 60"


- currying: ordinal form of partial application, where arguments are passed in in the order they are defined in the function definition as opposed to being free which parameters are defined "first"

      // not possible with currying but in some other functional languages or functional libraries
      const a2defined = partialApp(__, 20, __) 
      a2defined(10, __, 30) // total application
      

**Improving Higher Order Functions with Partial Application**
- R.__ = placeholder that skips over parameters
- what's the difference between partial / curry?
- Currying: A function returning another function that might return another function, b**ut every returned function must take only one parameter** at a time.
- Partial application: A function returning another function that might return another function, **but each returned function can take several parameters**.


**Writing a Utility to Curry Functions**
- 3 ways to call javascript functions (paranthesis, call, apply)
- Function.prototype.bind - returns a function with values to parameters already bound
  
      function func(a,b) { return a+b }
      func(1,2); // paranthesis
      // apply / call / bind: 1st parameter is the new this (can be any value if not needed in function)
      func.apply(null, [1,2]); // Apply, takes parameters as array, mnemonic: _A_pply = _A_rray
      func.call(null, 1, 2); // same as apply but with individual parameters
      const add1 = func.bind(this, 1); //returns a function with "this" rebound to first passed argument, the rest are bound to the parameters; Similar to Ramda.partial
      //let boundFunc = func.bind(thisArg[, arg1[, arg2[, ...argN]]])
      add1(2) // 3
  

**Combining Map, Filter, and Reduce with Curried Functions**