const { log } = console;
const { reduce, map, filter } = require('./funcUtils');
const R = require('ramda');
const { partial, curry, __ } = R;

const styles = {
  red: ['color: red', '\x1b[31m'],
  green: ['color: green', '\x1b[32m'],
  blue: ['color: blue', '\x1b[34m'],
  reset: ['color: unset', '\x1b[0m'],
};

function logger(useCss, styles, logger, logMethod, color, message, value) {
  let entry;
  const log = logger[logMethod],
    style = styles[color];

  //create entry message (true = browser, false = server)
  if (useCss) {
    entry = [`%c${message}`, style[0]];
  } else {
    entry = [`${style[1]}${message}${styles['reset'][1]}`];
  }

  log.apply(logger, [...entry, value]);
  return value;
}

// partial (just using the left to right parameters)
const consoleLog = partial(logger, [false, styles, console]);
const infoLog = partial(consoleLog, ['info', 'green', 'INFO'], {});
infoLog('Yay');
infoLog({ val: 'yay object or whatever' });

// curry
const consoleLogCurried = curry(logger);
const base = consoleLogCurried(false, styles, console);
const infoLog2 = base('info', 'blue', 'INFO');
infoLog2({ val: 'yay object or whatever' });

// curry with placeholder
const consoleLogCurried2 = curry(logger);
const base2 = consoleLogCurried2(true, __, console);
const infoLog3 = base2(styles, 'info', 'blue', 'INFO');
infoLog2({ val: 'yay object or whatever' });
