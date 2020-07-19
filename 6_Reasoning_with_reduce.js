'use strict';
const { log } = console;

const list = [1, 6, 2, 7, 3, 8, 4, 9];

// normal reduce
//log(list.reduce((acc, val) => acc + val, 0));

// map using reduce
//log(list.reduce((acc, val) => [...acc, val ** 2], []));

// filter using reduce
//log(list.reduce((acc, val) => (val < 5 ? [...acc, val] : acc), []));

// own reduce implementation
function reduce1(reducer, initial = 0, list) {
  let accum = initial;
  list.forEach((item) => {
    accum = reducer(accum, item);
  });

  return accum;
}

// log(reduce1((acc, val) => acc + val, 0, list));
// log(reduce1((acc, val) => [...acc, val ** 2], [], list));
// log(reduce1((acc, val) => (val < 5 ? [...acc, val] : acc), [], list));

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

// log(reduce((acc, val) => acc + val, 0, list));
// log(reduce((acc, val) => [...acc, val ** 2], [], list));
// log(reduce((acc, val) => (val < 5 ? [...acc, val] : acc), [], list));

const students = [
  { name: 'Jack', grades: [50, 20, null, 99, 8] },
  { name: 'Peer', grades: [100, 100, 98, 100, 100] },
  { name: 'Jill', grades: [80, 90, 50, null, 100] },
];

const divide = (a, b) => a / b;
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

const sortAsc = (list) => list.sort(subtract);
const dropLowest = (list) => sortAsc(map(clean, list));
const clean = (n) => (n ? n : 0); // drop null, undefined etc.
const getTotal = reduce((acc, n) => acc + n);
const getAvg = (xs) => divide(getTotal(xs), xs.length);

function map(fn, list) {
  if (arguments.length < 2) {
    return (list) => map(fn, list);
  }
  return reduce((acc, val) => [...acc, fn(val)], [], list);
}

function filter(fn, list) {
  if (arguments.length < 2) {
    return (list) => filter(fn, list);
  }
  return reduce((acc, val) => [...acc, fn(val)], [], list);
}

function studentStats(student) {
  const { name } = student;
  const grades = dropLowest(student.grades);
  const avg = getAvg(grades);
  const top = Math.max(...grades);
  return { name, grades, avg, top };
}
// const total = getTotal([1, 2, 3, 4]);
// log(total);

const data = map(studentStats)(students);
log(data);
const getBest = reduce(
  (acc, student) => (student.top > acc.top ? student : acc),
  data[0],
  data
);

log(getBest);
