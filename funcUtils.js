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

export { map, filter, reduce };
