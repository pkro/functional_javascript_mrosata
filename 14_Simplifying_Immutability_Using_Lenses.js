'use strict';
import R from 'ramda';

const { assert, log } = console;

const flip = (f) => (a, b) => f(b, a);
const logOut = flip(log);

const state = {
  players: [
    { folded: false, chips: 205, name: 'Thomas', cards: [] },
    { folded: false, chips: 110, name: 'Christina', cards: [] },
    { folded: false, chips: 450, name: 'Peer', cards: [] },
  ],

  phase: 0,

  ante: 10,

  community: [
    [10, '♠'],
    [5, '♥'],
    [12, '♥'],
  ],

  chipValues: {
    white: 1,
    blue: 5,
    green: 10,
    yellow: 25,
    red: 50,
    black: 100,
  },
};

Object.freeze(state);
logOut(state, 'before');
//state.ante = 20; // error after Object.freeze
state.community.push([14, '♥']); // NO error as only the parent object is frozen
logOut(state, 'after');

function freezer(obj) {
  const isObj = R.is(Object); // returns a function that expects one arg and returns true if arg type is object
  const freezeIfObj = R.when(isObj, freezer); // returns a function that expects one arg that calls freezer on arg if arg is object, otherwise returns as-is
  const freezeObjects = R.map(freezeIfObj); // returns a function that maps the freezeIfObj over the argument object
  // const freezeObjects = compose(map, flip(when(freezer)), is); // hmmmmmmm not working
  freezeObjects(obj);
  // single line
  //map(when(is(Object), freezer))(obj);
  return Object.freeze(obj);
}

freezer(state);
//state.community.push([14, '♥']); // Error as all sub-objects are now frozen

// const getter = curry((propName, obj) =>
//   is(Object, obj) ? obj[propName] : undefined, setter('ante'))
// );
const getter = R.prop;
// const setter = curry((key, val, obj) => {
//   const rv = mapObjIndexed(identity, obj); // copy
//   rv[key] = val;
//   return rv;
// });
const setter = R.assoc;
//const anteL = R.lens(getter('ante'), setter('ante')); // -> same as
const anteL = R.lensProp('ante');

// To view: view(anteL, state)
// To set: newObj = set(lens, value, state)
const state2 = R.set(anteL, 100, state);
//log(R.view(anteL, state2));

//const chipValuesL = R.lensProp('chipValues');
//const greenL = R.lensProp('green');
//const chipValsGreenL = (obj) => chipValuesL(greenL(obj));
// -> short:
const chipValsGreenL = R.lensPath(['chipValues', 'green']);
const player0chipsL = R.lensPath(['players', 0, 'chips']);
const state3 = R.set(chipValsGreenL, 400)(state2);
//logOut(state3, 'state3');

const state4 = R.set(player0chipsL, 10000, state3);
log(state4);

debugger;
