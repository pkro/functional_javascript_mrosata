const { log } = console;
const { reduce, map, filter } = require('../../funcUtils');
const isArray = Array.isArray;

const students = [
  { name: 'Alice', grades: [89, 93, null, 100, 66] },
  { name: 'Bob', grades: [70, 71, 100, 82, 90] },
  { name: 'Martin', grades: [89, 93, 45, 62, null] },
  { name: 'Storm', grades: [80, 70, 100, 82, 94] },
  { name: 'Corrina', grades: [86, null, 100, 34, 79] },
  { name: 'Alexa', grades: [95, 85, 100, null, 64] },
  { name: 'Susan', grades: [82, 91, 84, 94, 90] },
  { name: 'Jake', grades: [92, null, 84, null, 90] },
];

const divide = (a, b) => a / b;
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

const sortAsc = (list) => list.sort(subtract);
const dropLowest = (list) => sortAsc(map(clean, list));
const clean = (n) => (n ? n : 0); // drop null, undefined etc.
const getTotal = reduce((acc, n) => acc + n);
const getAvg = (xs) => divide(getTotal(xs), xs.length);

// ?
const getBestStats = reduce(bestStats, { topScore: [0, ''], topAvg: [0, ''] });

function bestStats(accum, student) {
  const { top, avg, name } = student;
  const { topAvg, topScore } = accum;
  const stats = { topAvg, topScore };

  stats.topScore = top > topScore[0] ? [top, name] : topScore;
  stats.topAvg = avg > topAvg[0] ? [avg, name] : topAvg;
  return stats;
}

function studentStats(student) {
  const { name } = student;
  const grades = dropLowest(student.grades);
  const avg = getAvg(grades);
  const top = Math.max(...grades);
  return { name, grades, avg, top };
}

const data = map(studentStats)(students);

const getBest = reduce(
  (acc, student) => (student.top > acc.top ? student : acc),
  data[0],
  data
);

export { data };
