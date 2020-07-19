'use strict';
const { log } = console;

const list = [1, 6, 2, 7, 3, 8, 4, 9];
const lt5 = (x) => x < 5;
const gt5 = (x) => x > 5;
const gt10 = (x) => x > 10;
const lt10 = (x) => x < 10;

function everyRec(predicate, [item, ...list]) {
  if (list.length) {
    return predicate(item) && everyRec(predicate, list);
  }
  return predicate(item);
}

log(everyRec(lt5, list));
log(everyRec(lt10, list));

function someRec(predicate, [item, ...list]) {
  if (list.length === 1) {
    return predicate(item) || everyRec(predicate, list);
  }
  return predicate(item);
}

log(`${someRec(lt5, list) ? 'Some' : 'None'} are less than 5`);
log(`${someRec(gt10, list) ? 'Some' : 'None'} are greater than 10`);
