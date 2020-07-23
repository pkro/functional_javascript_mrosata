function reduce(reducer, initial = 0, list) {
  if (arguments.length < 3) {
    // if no list given, return a function that has the list as only parameter and calls reduce with all (see getTotal function below)
    return (list) => reduce(reducer, initial, list);
  }
  // otherwise just return the value as usual
  let accum = initial;
  list.forEach((item) => {
    accum = reducer(accum, item);
  });

  return accum;
}

function map(transformer, list) {
  if (arguments.length === 1) {
    return (list) => map(transformer, list);
  }
  const output = new list.constructor();
  const keys = Object.keys(list); // works also on arrays which are just objects
  const isArray = Array.isArray(list);
  keys.forEach((key) => {
    if (isArray) {
      output.push(transformer(list[key])); // otherwise the array length property isn't updated
    } else {
      output[key] = transformer(list[key]);
    }
  });
  return output;
}

function filter(predicate, list) {
  if (arguments.length === 1) {
    return (list) => filter(predicate, list);
  }
  const output = new list.constructor();
  const keys = Object.keys(list);
  const isArray = Array.isArray(list);
  keys.forEach((key) => {
    if (predicate(list[key])) {
      if (isArray) {
        output.push(list[key]);
      } else {
        output[key] = list[key];
      }
    }
  });
  return output;
}

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

//module.exports = { map, filter, reduce, partial, __ };
export { map, filter, reduce, partial, __ };
