import color from 'colorts';
import * as _ from 'lodash';
import { config } from '../config/config';

// tslint:disable-next-line: no-empty
const nonOperation = () => {};

// tslint:disable-next-line: no-console
const consoleLog = config.logging ? console.log.bind(console) : nonOperation;

export const logger = {
  log(...params: any[]) {
    const tag = color('[ ✨ LOG ✨ ]').green.toString();
    const args = _.toArray(params).map((argument) => {
      if (typeof argument === 'object') {
        return (
          tag +
          ' ' +
          color(JSON.stringify(argument, undefined, 2)).green.toString()
        );
      }
      argument += '';
      return tag + ' ' + color(argument as string).green.toString();
    });
    consoleLog.apply<Console, string[], void>(console, args);
  },

  error(...params: any[]) {
    const args = params.map((argument) => {
      argument = argument.stack || argument;
      const name = argument.name || '[ ❌ ERROR ❌ ]';
      if (typeof argument === 'object') {
        argument = JSON.stringify(argument, undefined, 2);
      } else {
        argument = argument + '';
      }
      return (
        color(name).yellow.toString() + ' ' + color(argument + '').toString()
      );
    });
    consoleLog.apply<Console, any[], void>(console, args);
  }
};
