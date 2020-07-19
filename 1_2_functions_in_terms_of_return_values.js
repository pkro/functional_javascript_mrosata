'use strict';
const { log } = console;
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

const height = 10;
const diam = 20;

const diamToRadius = (diam) => divide(diam, 2);
const toPerimeter = (diam) => multiply(pi, diam);
const areaCircle = (radius) => multiply(pi, squared(radius));
const areaRect = multiply;

/**
 * surfaceAreaCylinder :: (Number, Number) -> Number
 * @param {Number} height
 * @param {Number} diameter
 */

// refactoring chain
//  function surfaceAreaCylinder(height, diameter) {
//   const areaTop = areaCircle(diamToRadius(diameter));
//   const sideArea = areaRect(toPerimeter(diameter), height);
//   return sum(doubled(areaTop), sideArea);
// }

const surfaceAreaCylinder = (height, diameter) =>
  sum(
    doubled(areaCircle(diamToRadius(diameter))),
    areaRect(toPerimeter(diameter), height)
  );
const totalArea = surfaceAreaCylinder(height, diam);
log(totalArea);

debugger;
