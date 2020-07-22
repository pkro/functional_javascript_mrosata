// this stuff isn't working probably because the sources are not imported correctly

const { log } = console;
const { reduce, map, filter, partial, __ } = require('./funcUtils');
const { sources } = require('./calendar-events');

const curry = partial;

//log(sources);
const isObj = (o) => o && typeof o === 'object';
const isDefined = (o) => typeof o !== 'undefined';

const prop = curry((key, obj) =>
  isObj(obj) && isDefined(obj[key]) ? obj[key] : undefined
);

// reverse / flipped args
//const objProp = (obj, key) => prop(key, obj);
const flip = curry((fn) => (a, b, ...args) => fn(b, a, ...args));
const objProp = flip(prop);

// const path = (arrPath, obj) =>
//   reduce(
//     (obj, key) => {
//       return prop(key, obj);
//     },
//     obj,
//     arrPath
//   );

const path = curry((arrPath, obj) => reduce(objProp, obj, arrPath));

const o = { a: { b: { c: 1000 } } };
log(path(['a', 'b', 'c'], o));

function onWeekend(day) {
  const dayNum = new Date(day).getDay();
  // 0 = sunday, 6 = saturday
  return [6, 0].some((n) => n === dayNum);
}
const startDateTime = path(['start', 'dateTime']);
const getWeekendItems = filter((item) => onWeekend(startDateTime(item)));
const showDateTime = (d) => new Date(d).toUTCString();

const getItems = map(prop('items'));

//log(getItems(sources));
const weEvents = (sources) => map(getWeekendItems, getItems(sources));

const mapDateTimeStrings = map(
  (event) => `${prop('summay', event)} - ${showDateTime(startDateTime(event))}`
);

log(map(mapDateTimeStrings(weEvents)));
