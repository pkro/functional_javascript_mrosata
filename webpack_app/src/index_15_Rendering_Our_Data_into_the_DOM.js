import html, { renderDOM } from './1.4.3.code';

// refactoring chain

// const ui = (state) => {
//   return html(
//     'div',
//     { className: 'container' },
//     html('p', null, `Hello World`)
//   );
// };

const ui = ({ greeting, whom = 'you' }) => {
  return html(
    'div',
    { className: 'container' },
    html('p', null, `${greeting} ${whom}`),
    html(
      'p',
      { id: 'test' },
      html('strong', null, `${greeting}`, '....', ' '),
      html('em', null, 'yay siblings')
    )
  );
};
const elem = ui({ greeting: 'Hello', whom: 'World' });

const defaultState = { greeting: 'Hello', whom: 'World' };

const update = renderDOM(
  ui,
  document.getElementById('packt-pub'),
  defaultState
);

// we can update state anytime

setTimeout(update, 4000, { greeting: 'buh', whom: 'everyone' });
