'use strict';
const { log } = console;

//doesn't do anything remote, just an example for using the loggerPure below
class RemoteLogger {
  constructor() {}
  sendMessage(message, value) {
    console.log('Logging remote message --> ', [
      Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(new Date().getTime()),
      message,
      value,
    ]);
  }
}

const rl = new RemoteLogger();
//rl.sendMessage('hey', { name: 'jude' });

/**
 * Mapping of colors oto an array with css styes and bash equivalents
 * {
 * colorName: [<css-style>, <shell-style>]}
 * }
 */
const styles = {
  red: ['color: red', '\x1b[31m'],
  green: ['color: green', '\x1b[32m'],
  blue: ['color: blue', '\x1b[34m'],
  reset: ['color: unset', '\x1b[0m'],
};

// refactoring chain
function loggerImpure1(
  useCss,
  logger,
  logMethod,
  color,
  message = '',
  value = null
) {
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

//loggerImpure1(false, console, 'log', 'blue', 'hey', 'again');

function loggerPure1(styles, useCss = true) {
  let entry;

  return function configLogger(logger, logMethod, color, message, value) {
    const log = logger[logMethod],
      style = styles[color];

    if (useCss) {
      entry = [`%c${message}`, style[0]];
    } else {
      entry = [`${style[1]}${message}${styles['reset'][1]}`];
    }

    log.apply(logger, [...entry, value]);
    return value;
  };
}

//const configLogger = loggerPure1(styles, false);
//configLogger(console, 'log', 'blue', 'more', 'pure');

function loggerPure2(styles, useCss = true) {
  let entry;

  return function configLogger(logger, logMethod) {
    const log = logger[logMethod];

    return function loggerColor(color, message, value) {
      const style = styles[color];
      console.log(log);
      if (useCss) {
        entry = [`%c${message}`, style[0]];
      } else {
        entry = [`${style[1]}${message}${styles['reset'][1]}`];
      }

      log.apply(logger, [...entry, value]);
      return value;
    };
  };
}

// const configLogger = loggerPure2(styles, false);
// const colorLogger = configLogger(console, 'log');
// colorLogger('blue', 'I am the', 'colorLogger');

function loggerPure3(styles, useCss = true) {
  let entry;

  return function configLogger(logger, logMethod = 'log') {
    const log = logger[logMethod];

    return function loggerColor(color) {
      const style = styles[color];
      return function (message, value = null) {
        if (useCss) {
          entry = [`%c${message}`, style[0]];
        } else {
          entry = [`${style[1]}${message}${styles['reset'][1]}`];
        }
        log.apply(logger, [...entry, value]);
        return value;
      };
    };
  };
}

// now we can configure partially
// const configLogger = loggerPure3(styles, false);
// const colorLogger = configLogger(console, 'log');
// const blueLogger = colorLogger('blue');
// blueLogger('I am the', 'blueLogger');
// // or
// loggerPure3(styles, false)(console)('blue')('test test', { id: 1 });

function loggerPure(styles, useCss = true) {
  let entry;

  return function configLogger(logger, logMethod = 'log') {
    const log = logger[logMethod];

    return function loggerColor(color, message) {
      debugger;
      const style = styles[color];
      return function (value = null) {
        if (useCss) {
          entry = [`%c${message}`, style[0]];
        } else {
          entry = [`${style[1]}${message}${styles['reset'][1]}`];
        }
        log.apply(logger, [...entry, value]);
        return value;
      };
    };
  };
}

const baseLogger = loggerPure(styles, false);
const consoleLogger = baseLogger(console);
const remoteLogger = baseLogger(new RemoteLogger(), 'sendMessage');

const infoLog = consoleLogger('green', 'info');
const warnLog = consoleLogger('blue', 'warn');
const errorLog = consoleLogger('red', 'error');

infoLog('Just informational');
warnLog('Something seems wrong');
errorLog('In knew it!');
