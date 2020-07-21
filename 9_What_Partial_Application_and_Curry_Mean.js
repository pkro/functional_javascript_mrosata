const { log } = console;
const { reduce, map, filter } = require('./funcUtils');

function totalApp(a1, a2, extra = '3') {
  log(totalApp.length); // 2, predefined parameters don't count for length
}

totalApp(100, 10, 'hello');

function partialApp(a1, a2, a3) {
  return `booom ${a1 + a2 + a3}`;
}
