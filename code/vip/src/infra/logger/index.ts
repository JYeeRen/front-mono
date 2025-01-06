import debug from 'debug';
import { APP_NAME } from '@app/infra';

localStorage.debug = `${APP_NAME}:*`;

class Logger {

  debug: debug.Debugger;

  constructor() {
    localStorage.debug = `${APP_NAME}:*`;
    this.debug = debug(APP_NAME ?? '');
  }

  get auth() {
    return this.debug.extend('auth');
  }

  get infra() {
    return this.debug.extend('infra');
  }

  get net() {
    return this.debug.extend('net');
  }

  get store() {
    return this.debug.extend('store');
  }

}

export default new Logger();
