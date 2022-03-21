/* eslint-disable no-console */

export abstract class Logger {
  static log(...params: unknown[]) {
    return console.log(params);
  }

  static error(...params: unknown[]) {
    return console.error(params);
  }

  static warn(...params: unknown[]) {
    return console.warn(params);
  }

  static info(...params: unknown[]) {
    return console.info(params);
  }

  static trace(...params: unknown[]) {
    return console.trace(params);
  }
}

export const {
  log, error, warn, info, trace,
} = Logger;
