'use strict';
import * as R from 'ramda'; // not just import R from 'ramda' bc Ramda has no default export
//const R = require('ramda');

/**
 * Create HTML structures in JavaScript
 * @param elementType
 * @param props
 * @param {...any} children
 */
export default function html(elementType, props, ...children) {
  // create an element for ui
  return makeElem(elementType, props, children);
}

function makeElem(elementType, props, children) {
  const elem = document.createElement(elementType);

  // check if props is obj, if yes add props to elem
  if (R.is(Object, props)) {
    //R.mapObjIndexed((val, key) => { // is just used as a forEach, so we might as well use it
    R.forEachObjIndexed((val, key) => {
      elem[key] = val;
    }, props);
  }

  R.map((child) => {
    // check if child is HTML element
    // if yes append to elem, else make textnode
    // then append
    return R.is(HTMLElement, child)
      ? elem.appendChild(child)
      : elem.appendChild(document.createTextNode(child));
  }, children);

  return elem;
}

/**
 * Take a function that passes state from our object
 * to our HTML Component
 * Render that Element into root
 * only impure function here
 * @param stateToUI
 * @param toot
 * @param defaultState
 */
export function renderDOM(stateToUI, root, defState = {}) {
  //create an initial ui
  const initUI = stateToUI(defState);
  root.appendChild(initUI);
  return (state) => {
    if (root.hasChildNodes()) {
      root.removeChild(root.firstElementChild);
    }
    root.appendChild(stateToUI(state));
  };
}
