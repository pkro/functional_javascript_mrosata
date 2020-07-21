const { log } = console;
const { reduce, map, filter } = require('./funcUtils');

function example(a, b, c) {
  log({ a, b, c });
  return a + b + c;
}

// example(1, 2, 3); // paranthesis
// example.apply(null, [1, 2, 3]); // Apply, takes parameters as array, mnemonic: _A_pply = _A_rray
// example.call(undefined, 1, 2, 3); // same as apply but with individual parameters
// const add1 = example.bind(this, 1, 2); // similar to Ramda partial
// log(add1(3)); // 6

// partial done with bind, which is pretty much the same just without "this" param

// partial refactoring chain
// basic
function partial_1(func, paramArray) {
  return func.bind(null, ...paramArray);
}
// reuturns either a function if less arguments given or value itself if # of args given equal to functions arrity
function partial_2(func, paramArray) {
  if (func.length > paramArray.length) {
    return func.bind(null, ...paramArray); // returns a function
  }
  return func.apply(null, paramArray); // directly returns the value
}

function partial_3(func, ...args) {
  const numReqArgs = func.length; // arrity

  return function _partial(...args2) {
    const current = [...args, ...args2];
    if (current.length >= numReqArgs) {
      return func(...current);
    }
    // still need more args
    return partial_3(func, ...current);
  };
}

// const pa = partial_3(example, 5, 6);
// log(pa.length); // 1
// log(pa(7)); // { a: 5, b: 6, c: 7 }
// const pa2 = partial_3(example, 5, 6, 8);
// log(pa2());

// const pa3 = partial_3(example);
// pa3(1, 2, 3);
// pa3(1)(2)(3);

// version with placeholder
const __ = Symbol('nothing');
const isPlaceholder = (a) => a === __;
const notPlaceholder = (a) => !isPlaceholder(a);
const removePlaceholders = (a) => filter(notPlaceholder, a);

function partial(func, ...args) {
  const numReqArgs = func.length; // arrity

  return function _partial(...args2) {
    // shift any placeholders to end
    const filledIn = map(
      (x) => (isPlaceholder(x) && args2.length ? args2.shift() : x),
      args
    );
    const current = [...filledIn, ...args2];
    const validArgs = removePlaceholders(current);

    if (validArgs.length >= numReqArgs) {
      return func(...validArgs);
    }
    // still need more args
    return partial(func, ...current);
  };
}

const pa1 = partial(example);
const pa2 = pa1(__, 'I am B');
const pa3 = pa2('I am A');
pa3('I am C');

const curried = partial(example, __, __, __);
curried(1, 2, 3);
curried(1)(2)(3);

const curried2 = partial(example, 1, __, 100);
curried2(10); // { a: 1, b: 10, c: 100 }
