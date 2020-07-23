const { log } = console;
import { reduce, map, filter, partial, __ } from './funcUtils.js';
import R from 'ramda';
import sources from './calendar-events.js';
//log(sources);
const curry = partial;

//log(sources);
const isObj = (o) => o && typeof o === 'object';
const isDefined = (o) => typeof o !== 'undefined';

const prop = curry((key, obj) =>
  isObj(obj) && isDefined(obj[key]) ? obj[key] : undefined
);

// reverse / flipped first 2 args
//const objProp = (obj, key) => prop(key, obj);
const flip = curry((fn, a, b, ...args) => fn(b, a, ...args));
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
//log(path(['a', 'b', 'c'], o));
//const t = path(['a', 'b', 'c']);
//log(t(o));

function onWeekend(day) {
  const dayNum = new Date(day).getDay();
  // 0 = sunday, 6 = saturday
  return [6, 0].some((n) => n === dayNum);
}

const startDateTime = path(['start', 'dateTime']);
const getWeekendItems = filter((item) => onWeekend(startDateTime(item)));
const showDateTime = (d) => new Date(d).toUTCString();

const getItems = map(prop('items'));
log(getItems(sources));
//log(getItems(sources));
const weEvents = map(getWeekendItems, getItems(sources));
//log(weEvents);
// remember that map is curried / partialed, so calling it without the object / array
// to work on it returns a function that expects that object/array
const mapDateTimeStrings = map(
  (event) =>
    `${prop('summary', event)} - ${startDateTime(event)} - ${showDateTime(
      startDateTime(event)
    )}`
);

log([].concat(...map(mapDateTimeStrings, weEvents)));
