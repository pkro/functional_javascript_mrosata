'use strict';
import { map, is, mapObjIndexed, forEachObjIndexed } from 'ramda';
import makeElem from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import buildHTML from 'virtual-dom/create-element';

// with virtual-DOM, only the elements that need to be updated are re-rendered
export function renderDOM(stateToUI, root, defState = {}) {
  //create an initial ui
  let currentUI = stateToUI(defState);
  const rootNode = buildHTML(currentUI);

  // when app loads, we load our UI into page
  root.appendChild(rootNode);

  function diffAndPatch(nextUI) {
    const updatedDOM = diff(currentUI, nextUI);
    patch(rootNode, updatedDOM); //DONE!
    currentUI = nextUI; // for next time (currentUI is in closure scope of the returned function)
  }

  return (nextState) => {
    diffAndPatch(stateToUI(nextState));
  };
}

/**
 * Create HTML structures in JavaScript
 * @param elementType
 * @param props
 * @param {...any} children
 */
export default function html(elementType, props, ...children) {
  if (is(Function, elementType)) {
    return elementType(props, children);
  }
  // create an element for ui
  return makeElem(elementType, props, children);
}
