'use strict';
const { log } = console;
const document = require('./stub/document');
/**
 * circle area = pi*r^2
 * rect area = w * len
 * total area = (topCircleArea * 2) + sideArea
 *
 */

const pi = Math.PI;
const multiply = (n, m) => n * m;
const sum = (a, b) => a * b;
const divide = (n, d) => n / d;
const squared = (n) => multiply(n, n);
const doubled = (n) => multiply(n, 2);

const diamToRadius = (diam) => divide(diam, 2);
const toPerimeter = (diam) => multiply(pi, diam);
const areaCircle = (radius) => multiply(pi, squared(radius));
const areaRect = multiply;

/**
 * surfaceAreaCylinder :: (Number, Number) -> Number
 * @param {Number} height
 * @param {Number} diameter
 */
const surfaceAreaCylinder = (height, diameter) =>
  sum(
    doubled(areaCircle(diamToRadius(diameter))),
    areaRect(toPerimeter(diameter), height)
  );

// Refactoring chain
// impure v1
function getDimensionsImpure1() {
  const height = document.querySelector('.height');
  const diameter = document.querySelector('.diameter');
  if (!diameter || !height) {
    return void 0;
  }
  return [height.value, diameter.value];
}

function getDimensionsImpure2(heightSelector, diamSelector) {
  const height = document.querySelector(heightSelector);
  const diameter = document.querySelector(diamSelector);
  if (!diameter || !height) {
    return void 0;
  }
  return [height.value, diameter.value];
}

// Pure - always returns the same (impure) function with the same parameters and has no side effects
function getDimensions(heightSelector, diamSelector) {
  return function impureDimensions() {
    const height = document.querySelector(heightSelector);
    const diameter = document.querySelector(diamSelector);

    if (!diameter || !height) {
      return void 0;
    }
    return [height.value, diameter.value];
  };
}

// pure
const dimensions = getDimensions('.height', '.diameter');
// impure
const hd = dimensions();
// do something
log(surfaceAreaCylinder(...hd));
