// this all also works with 1.4.3.code, but doesn't use virtual DOM so it re-renders the whole component on each state change
import { lensProp, view, set, sum } from 'ramda';
//import html, { renderDOM } from './1.4.3.code';
import html, { renderDOM } from './1.4.4.code';

// Component
const JumboTron = ({ greeting, whom }) => {
  return (
    <div className="jumbotron">
      <h1>
        {greeting} {whom}
      </h1>

      <p>rendered with jsx w/o virtual DOM</p>
    </div>
  );
};

const ui = (state) => {
  const { greeting, whom, counter } = state;

  // return html(...) is no longer needed as we defined the function to be used for jsx in .babelrc
  // no need for change of the html function!!
  return (
    <section className="container">
      <JumboTron greeting={greeting} whom={whom} />
      <div className="row">
        <div className="col-sm-10">
          <div className="form">
            <button
              className="btn btn-lg"
              onclick={() => updateTimer(state, 1)}
            >
              <icon className="glyphicon glyphicon-arrow-up" />
              Up
            </button>
            <button
              className="btn btn-lg"
              onclick={() => updateTimer(state, -1)}
            >
              <icon className="glyphicon glyphicon-arrow-down" />
              Down
            </button>
            <div className="form-control">
              <h4 className="lead">
                <strong>{counter}</strong>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultState = { greeting: 'Hello', whom: 'World', counter: 0 };
const elem = ui(defaultState);

const counterL = lensProp('counter');

function updateTimer(state, modifier = 0) {
  const updatedState = set(
    counterL,
    sum([parseInt(view(counterL, state)), modifier]),
    state
  );
  return update(updatedState);
}

const update = renderDOM(
  ui,
  document.getElementById('packt-pub'),
  defaultState
);
