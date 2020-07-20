// just for documentation, run from webpack_app

const { log } = console;
const { reduce, map, filter } = require('../../funcUtils');
const isArray = Array.isArray;
const { data } = require('./studentData');

const appRoot = document.querySelector('#packt-pub');
// appRoot.appendChild(
//   treeBuilder(elm('div', { id: 'hello', className: 'col-sm-12' }), [
//     'p',
//     ['em', 'Hello yay', 'strong', '!'],
//   ])
// );

function higherOrderSorter(sortFn, component) {
  return (data) => {
    const sorted = data.slice().sort(sortFn);
    return component(sorted);
  };
}

function sortBy(key) {
  return ({ [key]: a }, { [key]: b }) => {
    return a > b ? 1 : -1;
  };
}

const studentElem = (studentData) => {
  const makeRows = (rows, row) => {
    return rows.concat(['tr', ['td', row.name, 'td', row.top, 'td', row.avg]]);
  };

  return treeBuilder(elm('table', { className: 'table table-striped' }), [
    'thead',
    ['tr', ['th', 'Student name', 'th', 'Top score', 'th', 'Average']],

    'tbody',
    reduce(makeRows, [], studentData),
  ]);
};

const StudentComponent = higherOrderSorter(sortBy('name'), studentElem);

appRoot.appendChild(StudentComponent(data));

/**
 * Create an HTMLElement with attributes
 * @param tag
 * @param props
 */
function elm(tag = 'div', props = {}) {
  const elem = document.createElement(tag);

  for (const attr in props) {
    if (attr in elem) elem[attr] = props[attr];
    else elem.setAttribute(attr, props[attr]);
  }

  return elem;
}

/**
 * Build a nested DOM Structure in a document fragment.
 * Supports Siblings.
 *
 * @param elemName
 * @param children
 * @param siblings
 */
function treeBuilder(elemName, children, ...siblings) {
  const isArray = Array.isArray;
  const createElem = document.createElement.bind(document);
  const createText = document.createTextNode.bind(document);

  // First arg is null when a text node is sibling to a regular elem
  if (!elemName) {
    elemName = document.createDocumentFragment();
  }

  // Create a document fragment to attach
  const frag = document.createDocumentFragment();

  // If "sting" then make into an element, else it's already an element
  const elem = typeof elemName === 'string' ? createElem(elemName) : elemName;
  // Put children into element
  elem.appendChild(
    isArray(children) ? treeBuilder(...children) : createText(children)
  );

  // Put element into fragment "parent"
  frag.appendChild(elem);

  // If element has siblings they will be appended to fragment
  if (siblings.length) {
    frag.appendChild(treeBuilder(...siblings));
  }

  // Return fragment
  return frag;
}
