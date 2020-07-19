const { log } = console;

const gt10 = (n) => n > 10;
const addTen = (n) => n + 10;

// own map implementation that is curried and works on objects too
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

const items = [1, 4, 12, 14, 6, 29];

log(map(addTen, items));
const tenAdder = map(addTen);
log(tenAdder(items));

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

log(filter(gt10, items));
const gt10filter = filter(gt10);
log(gt10filter(items));

const mapThenFilter = filter(gt10, map(addTen, items));
log(mapThenFilter);

// these work on objects too
const obj = {
  a: 4,
  b: 20,
  c: 9,
};

log(map(addTen, obj));
log(filter(gt10, obj));
